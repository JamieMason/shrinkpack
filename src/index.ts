import { IFragment, IPackage, Shrinkpack, VariadicBooleanFn } from './typings';

if (process.env.NODE_ENV === 'development') {
  const snitch = require('./lib/snitch').snitch;
  snitch('semver', require('semver'));
  snitch('ssri', require('ssri'));
  snitch('src/lib/json', require('./lib/json'));
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
import { getIntegrity } from './lib/get-integrity';
import { getTimeBetween } from './lib/get-time-between';
import { decompressTar, mkdir, readdir, spawn, unlink } from './lib/io';
import { write as writeJson } from './lib/json';
import { getFragments, getPackages, locate } from './lib/lockfile';
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
  const isNeededArchive = (archivePath: string): boolean => neededArchives.indexOf(archivePath) !== -1;

  const hasSemVerVersion = (pkg: IPackage): boolean => semverValid(pkg.node.version) !== null;
  const isBundled = (pkg: IPackage): boolean => pkg.node.bundled === true;
  const isPackage = (pkg: IPackage): boolean => 'resolved' in pkg.node || 'version' in pkg.node;
  const isCached = (pkg: IPackage): boolean => cachedArchives.indexOf(getArchivePath(pkg)) !== -1;

  const addToCache = async (pkg: IPackage) => {
    await npmPack(cachePath, pkg.node.resolved);
    addition(getArchiveName(pkg));
  };

  const removeFromCache = async (archivePath: string) => {
    const tarName = relative(cachePath, archivePath);
    await unlink(archivePath);
    removal(tarName);
  };

  const decompressPackage = async (pkg: IPackage): Promise<IPackage> => {
    await decompressTar(getTgzPath(pkg), getTarPath(pkg));
    return pkg;
  };

  const mutateIntegrityProp = async (pkg: IPackage): Promise<IPackage> => {
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
    const stdout = await spawn('npm', ['ls', '--json', pkg.key]);
    const isSamePackage = (other: IFragment) => other.key === pkg.key;
    const isSameVersion = (other: IFragment) => other.node.resolved === pkg.node.version;
    const fragment: IFragment = getFragments(JSON.parse(stdout))
      .filter(isSamePackage)
      .filter(isSameVersion)[0];
    pkg.node.version = fragment.node.version;
    pkg.node.resolved = fragment.node.resolved;
    resolve(`${pkg.key}@${pkg.node.version} (${pkg.node.resolved})`);
    return pkg;
  };

  await mkdir(cachePath);
  const lockfile = await locate(projectPath);

  if (lockfile === null) {
    error('npm-shrinkwrap.json is missing, create it using `npm shrinkwrap` then try again');
    process.exit(1);
    return;
  }

  if (JSON.stringify(lockfile.data).indexOf('file:node_shrinkwrap') !== -1) {
    error('npm-shrinkwrap.json is already shrinkpacked, update it using `npm shrinkwrap` then try again');
    process.exit(1);
  }

  const packages = getPackages(lockfile.data).filter(isPackage);
  const neededPackages = packages.filter(not(isBundled));
  const unresolvedPackages = neededPackages.filter(not(hasSemVerVersion));

  await Promise.all(unresolvedPackages.map(mutateUnresolvedProps));

  const cachedArchives = (await readdir(cachePath)).filter(isArchivePath);
  const neededArchives = neededPackages.map(getArchivePath);
  const unneededArchives = cachedArchives.filter(not(isNeededArchive));

  const tarPackages = neededPackages.filter(() => decompress);
  const uncachedPackages = neededPackages.filter(not(isCached));
  const uncachedTarPackages = uncachedPackages.filter(() => decompress);

  await Promise.all(uncachedPackages.map(addToCache));
  await Promise.all(uncachedTarPackages.map(decompressPackage));
  await Promise.all(unneededArchives.map(removeFromCache));

  info(`rewriting ${lockfile.filePath}`);
  await Promise.all(tarPackages.map(mutateIntegrityProp));
  await Promise.all(neededPackages.map(mutateResolvedProp));
  await writeJson(lockfile.filePath, lockfile.data);

  const tempFiles = (await readdir(cachePath)).filter(isArchivePath).filter(not(isNeededArchive));
  await Promise.all(tempFiles.map(unlink));

  const added = chalk.green(`+${uncachedPackages.length}`);
  const removed = chalk.red(`-${unneededArchives.length}`);
  const resolved = chalk.yellow(`✓${unresolvedPackages.length}`);
  const timeTaken = chalk.grey(getTimeBetween(startTime, new Date()));

  console.info(`shrinkpack ${added} ${removed} ${resolved} ${timeTaken}`);
};
