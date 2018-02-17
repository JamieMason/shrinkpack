import { IPackage, Shrinkpack, VariadicBooleanFn } from './typings';

if (process.env.NODE_ENV === 'development') {
  const snitch = require('./lib/snitch').snitch;
  snitch('semver', require('semver'));
  snitch('ssri', require('ssri'));
  snitch('src/lib/json', require('./lib/json'));
  snitch('src/lib/get-fragment', require('./lib/get-fragment'));
  snitch('src/lib/get-integrity', require('./lib/get-integrity'));
  snitch('src/lib/io/guard', require('./lib/io/guard'));
  snitch('src/lib/io/fs', require('./lib/io/fs'));
  snitch('src/lib/io/child-process', require('./lib/io/child-process'));
  snitch('src/lib/io/decompress-tar', require('./lib/io/decompress-tar'));
  snitch('src/lib/npm-pack', require('./lib/npm-pack'));
  snitch('src/lib/lockfile', require('./lib/lockfile'));
  snitch('src/lib/get-time-between', require('./lib/get-time-between'));
}

import chalk from 'chalk';
import { join, relative } from 'path';
import { valid as semverValid } from 'semver';
import { getFragment } from './lib/get-fragment';
import { getIntegrity } from './lib/get-integrity';
import { getTimeBetween } from './lib/get-time-between';
import { decompressTar, mkdir, readdir, unlink } from './lib/io';
import { write as writeJson } from './lib/json';
import { getPackages, locate } from './lib/lockfile';
import { addition, error, info, removal, resolve } from './lib/log';
import { npmPack } from './lib/npm-pack';

export const shrinkpack: Shrinkpack = async ({ decompress = true, projectPath = process.cwd() }) => {
  const startTime = new Date();
  const cachePath = join(projectPath, 'node_shrinkwrap');

  const not = (fn: VariadicBooleanFn): VariadicBooleanFn => (...args) => !fn(...args);

  const getKey = (pkg: IPackage) => pkg.key.replace(/@/g, '').replace(/\//g, '-');
  const getName = (extension: string) => (pkg: IPackage): string => `${getKey(pkg)}-${pkg.node.version}.${extension}`;
  const getTarName = getName('tar');
  const getTgzName = getName('tgz');
  const getTarPath = (pkg: IPackage): string => join(cachePath, getTarName(pkg));
  const getTgzPath = (pkg: IPackage): string => join(cachePath, getTgzName(pkg));
  const getArchiveName = (pkg: IPackage): string => (decompress ? getTarName(pkg) : getTgzName(pkg));
  const getArchivePath = (pkg: IPackage): string => (decompress ? getTarPath(pkg) : getTgzPath(pkg));

  const isArchivePath = (str: string): boolean => String(str).search(/\.(tgz|tar)$/) !== -1;
  const isNeededArchive = (archivePath: string): boolean => archivesToKeep.indexOf(archivePath) !== -1;

  const hasSemVerVersion = (pkg: IPackage): boolean => semverValid(pkg.node.version) !== null;
  const isBundled = (pkg: IPackage): boolean => pkg.node.bundled === true;
  const isPackage = (pkg: IPackage): boolean => 'resolved' in pkg.node || 'version' in pkg.node;
  const isCached = (pkg: IPackage): boolean => archives.indexOf(getArchivePath(pkg)) !== -1;

  const addArchive = async (pkg: IPackage) => {
    await npmPack(cachePath, pkg.node.resolved);
    addition(getArchiveName(pkg));
  };

  const removeArchive = async (archivePath: string) => {
    const tarName = relative(cachePath, archivePath);
    await unlink(archivePath);
    removal(tarName);
  };

  const decompressPackage = async (pkg: IPackage): Promise<IPackage> => {
    await decompressTar(getTgzPath(pkg), getTarPath(pkg));
    return pkg;
  };

  const rehashPackage = async (pkg: IPackage): Promise<IPackage> => {
    pkg.node.integrity += ' ' + await getIntegrity(getArchivePath(pkg))
    return pkg;
  };

  const repointPackage = (pkg: IPackage): IPackage => {
    pkg.node.resolved = `file:node_shrinkwrap/${getArchiveName(pkg)}`;
    return pkg;
  };

  const resolvePackage = async (pkg: IPackage): Promise<IPackage> => {
    const fragment = await getFragment(pkg);
    pkg.node.version = fragment.node.version;
    pkg.node.resolved = fragment.node.resolved;
    resolve(`${pkg.key}@${pkg.node.version} (${pkg.node.resolved})`);
    return pkg;
  };

  await mkdir(cachePath);
  const lockfile = await locate(projectPath);

  if (lockfile === null) {
    error('no package-lock.json or npm-shrinkwrap.json found. Please install using npm@5 or later, or run `npm shrinkwrap` to generate one.');
    process.exit(1);
    return;
  }

  if (JSON.stringify(lockfile.data).indexOf('file:node_shrinkwrap') !== -1) {
    error('npm-shrinkwrap.json is already shrinkpacked, update it using `npm shrinkwrap` then try again');
    process.exit(1);
  }

  const packages = getPackages(lockfile.data)
    .filter(isPackage)
    .filter(not(isBundled));

  const packagesToResolve = packages.filter(not(hasSemVerVersion));
  await Promise.all(packagesToResolve.map(resolvePackage));

  const archives = (await readdir(cachePath)).filter(isArchivePath);
  const archivesToKeep = packages.map(getArchivePath);
  const archivesToRemove = archives.filter(not(isNeededArchive));

  const packagesToAdd = packages.filter(not(isCached));
  const packagesToDecompress = decompress ? packagesToAdd : [];
  const packagesToRehash = decompress ? packages : [];

  await Promise.all(packagesToAdd.map(addArchive));
  await Promise.all(packagesToDecompress.map(decompressPackage));
  await Promise.all(archivesToRemove.map(removeArchive));

  info(`rewriting ${lockfile.filePath}`);
  await Promise.all(packagesToRehash.map(rehashPackage));
  await Promise.all(packages.map(repointPackage));
  await writeJson(lockfile.filePath, lockfile.data);

  const tempFiles = (await readdir(cachePath)).filter(isArchivePath).filter(not(isNeededArchive));
  await Promise.all(tempFiles.map(unlink));

  const added = chalk.green(`+${packagesToAdd.length}`);
  const removed = chalk.red(`-${archivesToRemove.length}`);
  const resolved = chalk.yellow(`✓${packagesToResolve.length}`);
  const timeTaken = chalk.grey(getTimeBetween(startTime, new Date()));

  console.info(`shrinkpack ${added} ${removed} ${resolved} ${timeTaken}`);
};
