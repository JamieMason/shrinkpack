import { IExeca, IFragment, IPackage, Shrinkpack, VariadicBooleanFn } from './typings';

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

  const tarRequired = (): boolean => decompress;
  const not = (fn: VariadicBooleanFn): VariadicBooleanFn => (...args) => !fn(...args);

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

  const decompressPackage = async (pkg: IPackage): Promise<IPackage> => {
    verbose(`decompressing ${getPackName(pkg)}`);
    await decompressTar(getTgzPath(pkg), getTarPath(pkg));
    return pkg;
  };

  const rewriteIntegrity = async (pkg: IPackage): Promise<IPackage> => {
    verbose(`hashing ${getPackName(pkg)}`);
    const tgzIntegrity = pkg.node.integrity;
    const tarIntegrity = await getIntegrity(getPackPath(pkg));
    pkg.node.integrity = tgzIntegrity ? `${tgzIntegrity} ${tarIntegrity}` : tarIntegrity;
    return pkg;
  };

  const rewriteResolved = (pkg: IPackage): IPackage => {
    pkg.node.resolved = getResolvedPath(pkg);
    return pkg;
  };

  const resolvePackage = async (pkg: IPackage): Promise<IPackage> => {
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
    error('npm-shrinkwrap.json is missing, create it using `npm shrinkwrap` then try again');
    process.exit(1);
  }

  const packedFiles = await readDir(packPath);
  const packedFilesByPackPath = groupBy<string>((location: string) => location, packedFiles);

  const packages = getPackages(lockfile.data).filter(isPackage);
  const unbundledPackages = packages.filter(not(isBundled));

  await when.all(unbundledPackages.filter(not(hasSemVerVersion)).map(resolvePackage));

  const packagesByPackPath = groupBy<IPackage>(getPackPath, unbundledPackages);
  const unpackedPackages = unbundledPackages.filter(not(isPacked));
  const unusedPackages = packedFiles.filter(isTarPath).filter(isUnusedFile);

  await when.all(unpackedPackages.map(packPackage));
  await when.all(unpackedPackages.filter(tarRequired).map(decompressPackage));
  await when.all(unusedPackages.map(unpackPackage));

  const tempFiles = (await readDir(packPath)).filter(isTarPath).filter(isUnusedFile);
  await when.all(tempFiles.map(rmFile));

  info(`rewriting ${lockfile.location}`);
  await when.all(unbundledPackages.filter(tarRequired).map(rewriteIntegrity));
  await when.all(unbundledPackages.map(rewriteResolved));
  await write(lockfile.location, lockfile.data);

  const added = chalk.green(`+${unpackedPackages.length}`);
  const removed = chalk.red(`-${unusedPackages.length}`);
  const timeTaken = chalk.grey(getTimeBetween(startTime, new Date()));

  console.info('shrinkpack %s %s %s', added, removed, timeTaken);
};
