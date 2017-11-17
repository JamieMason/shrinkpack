import { IExeca, IFragment, IPackage, Shrinkpack, VariadicBooleanFn } from './typings';

import { join, relative } from 'path';
import { spawn } from './lib/child-process';
import { decompressTar } from './lib/decompress-tar';
import { mkDir, readDir, rmFile } from './lib/fs';
import { getIntegrity } from './lib/get-integrity';
import { getTimeBetween } from './lib/get-time-between';
import { write } from './lib/json';
import { getFragments, getPackages, locate } from './lib/lockfile';
import { addition, error, info, removal, resolve, verbose } from './lib/log';
import { npmPack } from './lib/npm-pack';

const chalk = require('chalk');
const semver = require('semver');
const when = require('when');

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
  const isNeededArchive = (archivePath: string): boolean => neededArchives.indexOf(archivePath) !== -1;

  const hasSemVerVersion = (pkg: IPackage): boolean => semver.valid(pkg.node.version);
  const isBundled = (pkg: IPackage): boolean => pkg.node.bundled === true;
  const isPackage = (pkg: IPackage): boolean => 'resolved' in pkg.node || 'version' in pkg.node;
  const isCached = (pkg: IPackage): boolean => cachedArchives.indexOf(getArchivePath(pkg)) !== -1;

  const addToCache = async (pkg: IPackage) => {
    verbose(`packing ${getArchiveName(pkg)} using "${pkg.node.resolved}"`);
    await npmPack(cachePath, pkg.node.resolved);
    addition(getArchiveName(pkg));
  };

  const removeFromCache = async (archivePath: string) => {
    const tarName = relative(cachePath, archivePath);
    verbose(`unpacking ${tarName}`);
    await rmFile(archivePath);
    removal(tarName);
  };

  const decompressPackage = async (pkg: IPackage): Promise<IPackage> => {
    verbose(`decompressing ${getArchiveName(pkg)}`);
    await decompressTar(getTgzPath(pkg), getTarPath(pkg));
    return pkg;
  };

  const mutateIntegrityProp = async (pkg: IPackage): Promise<IPackage> => {
    verbose(`hashing ${getArchiveName(pkg)}`);
    const tgzIntegrity = await getIntegrity(getTgzPath(pkg));
    const tarIntegrity = await getIntegrity(getTarPath(pkg));
    pkg.node.integrity = tgzIntegrity.concat(tarIntegrity).toJSON();
    return pkg;
  };

  const mutateResolvedProp = (pkg: IPackage): IPackage => {
    pkg.node.resolved = `file:node_shrinkwrap/${getArchiveName(pkg)}`;
    return pkg;
  };

  const mutateUnresolvedProps = async (pkg: IPackage): Promise<IPackage> => {
    const shell: IExeca = await spawn('npm', ['ls', '--json', pkg.key]);
    const isSamePackage = (other: IFragment) => other.key === pkg.key;
    const isSameVersion = (other: IFragment) => other.node.resolved === pkg.node.version;
    const fragment: IFragment = getFragments(JSON.parse(shell.stdout))
      .filter(isSamePackage)
      .filter(isSameVersion)[0];
    pkg.node.version = fragment.node.version;
    pkg.node.resolved = fragment.node.resolved;
    resolve(`${pkg.key}@${pkg.node.version} (${pkg.node.resolved})`);
    return pkg;
  };

  await mkDir(cachePath);
  const lockfile = await locate(projectPath);

  if (lockfile === null) {
    error('npm-shrinkwrap.json is missing, create it using `npm shrinkwrap` then try again');
    process.exit(1);
  }

  if (JSON.stringify(lockfile.data).indexOf('file:node_shrinkwrap') !== -1) {
    error('npm-shrinkwrap.json is already shrinkpacked, update it using `npm shrinkwrap` then try again');
    process.exit(1);
  }

  const packages = getPackages(lockfile.data).filter(isPackage);
  const neededPackages = packages.filter(not(isBundled));
  const unresolvedPackages = neededPackages.filter(not(hasSemVerVersion));

  await when.all(unresolvedPackages.map(mutateUnresolvedProps));

  const cachedArchives = (await readDir(cachePath)).filter(isArchivePath);
  const neededArchives = neededPackages.map(getArchivePath);
  const unneededArchives = cachedArchives.filter(not(isNeededArchive));

  const tarPackages = neededPackages.filter(() => decompress);
  const uncachedPackages = neededPackages.filter(not(isCached));
  const uncachedTarPackages = uncachedPackages.filter(() => decompress);

  await when.all(uncachedPackages.map(addToCache));
  await when.all(uncachedTarPackages.map(decompressPackage));
  await when.all(unneededArchives.map(removeFromCache));

  info(`rewriting ${lockfile.filePath}`);
  await when.all(tarPackages.map(mutateIntegrityProp));
  await when.all(neededPackages.map(mutateResolvedProp));
  await write(lockfile.filePath, lockfile.data);

  const tempFiles = (await readDir(cachePath)).filter(isArchivePath).filter(not(isNeededArchive));
  await when.all(tempFiles.map(rmFile));

  const added = chalk.green(`+${uncachedPackages.length}`);
  const removed = chalk.red(`-${unneededArchives.length}`);
  const resolved = chalk.yellow(`✓${unresolvedPackages.length}`);
  const timeTaken = chalk.grey(getTimeBetween(startTime, new Date()));

  console.info(`shrinkpack ${added} ${removed} ${resolved} ${timeTaken}`);
};
