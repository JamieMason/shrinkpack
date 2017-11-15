import { IExeca, IFragment, IPackage, Shrinkpack } from './typings';

import { join, relative } from 'path';
import { addToPack } from './lib/add-to-pack';
import { spawn } from './lib/child-process';
import { decompressTar } from './lib/decompress-tar';
import { mkDir, readDir, rmFile } from './lib/fs';
import { getIntegrity } from './lib/get-integrity';
import { getTimeBetween } from './lib/get-time-between';
import { groupBy } from './lib/group-by';
import { write } from './lib/json';
import { getFragments, getPackages, locate } from './lib/lockfile';
import { addition, error, info, removal, resolve, verbose } from './lib/log';

const chalk = require('chalk');
const semver = require('semver');
const when = require('when');

export const shrinkpack: Shrinkpack = async ({ decompress = true, projectPath = process.cwd() }) => {
  const startTime = new Date();
  const packPath = join(projectPath, 'node_shrinkwrap');

  const getKey = (pkg: IPackage) => pkg.key.replace(/@/g, '').replace(/\//g, '-');
  const getName = (extension: string) => (pkg: IPackage): string => `${getKey(pkg)}-${pkg.node.version}.${extension}`;
  const getTarName = getName('tar');
  const getTgzName = getName('tgz');
  const getTarPath = (pkg: IPackage): string => join(packPath, getTarName(pkg));
  const getTgzPath = (pkg: IPackage): string => join(packPath, getTgzName(pkg));
  const getPackName = (pkg: IPackage): string => (decompress ? getTarName(pkg) : getTgzName(pkg));
  const getPackPath = (pkg: IPackage): string => (decompress ? getTarPath(pkg) : getTgzPath(pkg));
  const getResolvedPath = (pkg: IPackage): string => `file:node_shrinkwrap/${getPackName(pkg)}`;

  const containsPattern = (regex: RegExp, str: string) => String(str).search(regex) !== -1;
  const isTarPath = (str: string): boolean => containsPattern(/\.(tgz|tar)$/, str);
  const isUnusedFile = (filePath: string): boolean => filePath in packagesByPackPath === false;

  const hasSemVerVersion = (pkg: IPackage): boolean => semver.valid(pkg.node.version);
  const isBundled = (pkg: IPackage): boolean => pkg.node.bundled === true;
  const isPackage = (pkg: IPackage): boolean => 'resolved' in pkg.node || 'version' in pkg.node;
  const isPacked = (pkg: IPackage): boolean => getPackPath(pkg) in packedFilesByPackPath;
  const isUnpacked = (pkg: IPackage): boolean => isPacked(pkg) === false;
  const isUnresolved = (pkg: IPackage): boolean => !hasSemVerVersion(pkg);

  const packPackage = async (pkg: IPackage) => {
    verbose(`packing ${getPackName(pkg)}`);
    await addToPack(packPath, pkg.node.resolved);
    addition(getPackName(pkg));
  };

  const unpackPackage = async (tarPath: string) => {
    const tarName = relative(packPath, tarPath);
    verbose(`unpacking ${tarName}`);
    await rmFile(tarPath);
    removal(tarName);
  };

  const decompressPackage = async (pkg: IPackage) => {
    if (decompress) {
      verbose(`decompressing ${getPackName(pkg)}`);
      await decompressTar(getTgzPath(pkg), getTarPath(pkg));
    }
  };

  const rewritePackage = async (pkg: IPackage) => {
    if (decompress) {
      verbose(`hashing ${getPackName(pkg)}`);
      const tgzIntegrity = pkg.node.integrity;
      const tarIntegrity = await getIntegrity(getPackPath(pkg));
      pkg.node.integrity = tgzIntegrity ? `${tgzIntegrity} ${tarIntegrity}` : tarIntegrity;
    }
    pkg.node.resolved = getResolvedPath(pkg);
  };

  const resolvePackage = async (pkg: IPackage) => {
    const res: IExeca = await spawn('npm', ['ls', '--json', pkg.key]);
    const isSamePackage = (other: IFragment) => other.key === pkg.key;
    const isSameVersion = (other: IFragment) => other.node.resolved === pkg.node.version;
    const fragment: IFragment = getFragments(JSON.parse(res.stdout))
      .filter(isSamePackage)
      .filter(isSameVersion)[0];
    pkg.node.version = fragment.node.version;
    pkg.node.resolved = fragment.node.resolved;
    resolve(`${pkg.key}@${pkg.node.version} (${pkg.node.resolved})`);
    return pkg;
  };

  await mkDir(packPath);
  const lockfile = await locate(projectPath);

  if (lockfile === null) {
    error('unable to continue without an npm-shrinkwrap.json or package-lock.json');
    process.exit(1);
  }

  const packedFiles = await readDir(packPath);
  const packedFilesByPackPath = groupBy<string>((location: string) => location, packedFiles);

  const packages = getPackages(lockfile.data).filter(isPackage);
  const unbundledPackages = packages.filter((pkg: IPackage) => !isBundled(pkg));

  await when.all(unbundledPackages.filter(isUnresolved).map(resolvePackage));

  const packagesByPackPath = groupBy<IPackage>(getPackPath, unbundledPackages);
  const unpackedPackages = unbundledPackages.filter(isUnpacked);
  const unusedPackages = packedFiles.filter(isTarPath).filter(isUnusedFile);

  await when.all(unpackedPackages.map(packPackage));
  await when.all(unpackedPackages.map(decompressPackage));
  await when.all(unusedPackages.map(unpackPackage));

  const tempFiles = (await readDir(packPath)).filter(isTarPath).filter(isUnusedFile);
  await when.all(tempFiles.map(rmFile));

  info(`rewriting ${lockfile.location}`);
  await when.all(unbundledPackages.map(rewritePackage));
  await write(lockfile.location, lockfile.data);

  const added = chalk.green(`+${unpackedPackages.length}`);
  const removed = chalk.red(`-${unusedPackages.length}`);
  const timeTaken = chalk.grey(getTimeBetween(startTime, new Date()));

  console.info('shrinkpack %s %s %s', added, removed, timeTaken);
};
