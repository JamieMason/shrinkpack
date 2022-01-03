import { mkdir, readdir, rm, writeFile } from 'fs/promises';
import { join, relative } from 'path';
import color from 'picocolors';
import { fromNetwork } from './lib/from-network';
import { getLockfile } from './lib/get-lockfile';
import { getSsriFromFile } from './lib/get-ssri-from-file';
import { getTimeBetween } from './lib/get-time-between';
import { log } from './lib/log';

interface Options {
  directory: string;
}

export async function shrinkpack({ directory }: Options): Promise<void> {
  const startTime = new Date();
  const { lockfilePath, lockfile } = getLockfile(directory);
  const wrapDirPath = join(directory, 'node_shrinkpack');

  let totalAdded = 0;
  let totalDeleted = 0;

  await mkdir(wrapDirPath, { recursive: true });
  const wrapDirContents = await readdir(wrapDirPath);
  const requiredWrapDirContents: Record<string, true> = {};
  const deletions: Promise<void>[] = [];

  for (const key in lockfile.packages) {
    if (key === '') continue;
    if (!key.includes('node_modules')) continue;
    const record = lockfile.packages[key];
    if (record.link === true) continue;
    if (!record.resolved && !record.version) continue;
    const name = key.replace(/^.*node_modules\//g, '');
    const scopelessName = name.replace(/^.+\//, '');
    const resolved =
      record.resolved ||
      `https://registry.npmjs.org/${name}/-/${scopelessName}-${record.version}.tgz`;
    const wrapFileName = `${name.replace(/\//g, '_')}-${record.version}.tar`;
    const wrapFilePath = join(wrapDirPath, wrapFileName);
    const shortWrapFilePath = relative(directory, wrapFilePath);
    const spec = `${name}@${record.version}`;
    const isInWrapDir = wrapDirContents.includes(wrapFileName);
    const isAlreadyWrapped = resolved.includes('node_shrinkpack');
    if (isAlreadyWrapped && !isInWrapDir) {
      const header = `${spec} points to ${resolved} which is missing`;
      const footer = `delete lockfile, reinstall, then run shrinkpack again`;
      log.error(`${header}\n  ${footer}`);
      process.exit(1);
    }
    const integrity = isInWrapDir
      ? await getSsriFromFile(wrapFilePath)
      : await fromNetwork(resolved, wrapFilePath);

    if (!isInWrapDir) {
      log.download(spec);
      totalAdded++;
    }

    record.integrity = [record.integrity, integrity].filter(Boolean).join(' ');
    record.resolved = `file:${shortWrapFilePath}`;
    requiredWrapDirContents[wrapFileName] = true;
  }

  for (const filename of wrapDirContents) {
    if (!requiredWrapDirContents[filename]) {
      const filePath = join(wrapDirPath, filename);
      const shortPath = relative(directory, filePath);
      log.deletion(shortPath);
      deletions.push(rm(filePath));
      totalDeleted++;
    }
  }

  // this is ignored by npm >= 7
  lockfile.dependencies = undefined;

  const nextLockfile = JSON.stringify(lockfile, null, 2);
  await Promise.all([writeFile(lockfilePath, nextLockfile), deletions]);

  console.log(
    [
      'shrinkpack',
      color.green(`+${totalAdded}`),
      color.red(`-${totalDeleted}`),
      color.gray(getTimeBetween(startTime, new Date())),
    ].join(' '),
  );
}
