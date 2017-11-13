import { IPackage, Shrinkpack } from './typings';

import { join, relative } from 'path';
import { addToBundle } from './lib/add-to-bundle';
import { decompressTar } from './lib/decompress-tar';
import { mkDir, rmDir, rmFile } from './lib/fs';
import { getIntegrity } from './lib/get-integrity';
import { getTimeBetween } from './lib/get-time-between';
import { groupBy } from './lib/group-by';
import { read, write } from './lib/json';
import { getPackages } from './lib/lockfile';
import { addition, info, removal, verbose } from './lib/log';

const chalk = require('chalk');
const keys = require('when/keys');
const semver = require('semver');
const when = require('when');

export const shrinkpack: Shrinkpack = async ({ decompress = true, projectPath = process.cwd() }) => {
  const startTime = new Date();
  const packageLockPath = join(projectPath, 'package-lock.json');
  const bundlePath = join(projectPath, 'node_shrinkwrap');
  const { lockfile } = await keys.all({
    lockfile: read(packageLockPath),
    mkDir: mkDir(bundlePath)
  });

  const getName = (extension: string) => (pkg: IPackage): string => `${pkg.key}-${pkg.node.version}.${extension}`;
  const getTarName = getName('tar');
  const getTgzName = getName('tgz');
  const getTarPath = (pkg: IPackage): string => join(bundlePath, getTarName(pkg));
  const getTgzPath = (pkg: IPackage): string => join(bundlePath, getTgzName(pkg));
  const getBundleName = (pkg: IPackage): string => (decompress ? getTarName(pkg) : getTgzName(pkg));
  const getBundlePath = (pkg: IPackage): string => (decompress ? getTarPath(pkg) : getTgzPath(pkg));
  const getResolvedPath = (pkg: IPackage): string => `file:node_shrinkwrap/${getBundleName(pkg)}`;
  const getNamedVersion = (pkg: IPackage): string => `${pkg.key}@${pkg.node.version}`;

  const contains = (substr: string, str: string) => String(str).indexOf(substr) !== -1;
  const containsPattern = (regex: RegExp, str: string) => String(str).search(regex) !== -1;
  const isRegistryUrl = (str: string): boolean => contains('https://registry.npmjs.org', str);
  const isTarPath = (str: string): boolean => containsPattern(/\.(tgz|tar)$/, str);
  const isUnusedFile = (filePath: string): boolean => filePath in packagesByBundlePath === false;

  const hasVersionAsRegistryUrl = (pkg: IPackage): boolean => isRegistryUrl(pkg.node.version);
  const hasVersionAsSemVer = (pkg: IPackage): boolean => semver.valid(pkg.node.version);
  const isBundled = (pkg: IPackage): boolean => getBundlePath(pkg) in bundledFilesByBundlePath;
  const isUnbundled = (pkg: IPackage): boolean => isBundled(pkg) === false;

  const bundleByResolvedPath = (pkg: IPackage) => addToBundle(bundlePath, pkg.node.resolved);
  const bundleByVersionAsRegistryUrl = (pkg: IPackage) => addToBundle(bundlePath, pkg.node.version);
  const bundleByVersionAsSemVer = (pkg: IPackage) => addToBundle(bundlePath, getNamedVersion(pkg));

  const decompressPackage = async (pkg: IPackage) => {
    if (decompress) {
      verbose(`decompressing ${getBundleName(pkg)}`);
      await decompressTar(getTgzPath(pkg), getTarPath(pkg));
    }
  };

  const bundlePackage = async (pkg: IPackage) => {
    verbose(`bundling ${getBundleName(pkg)}`);
    if (hasVersionAsSemVer(pkg)) {
      await bundleByVersionAsSemVer(pkg);
    } else if (hasVersionAsRegistryUrl(pkg)) {
      await bundleByVersionAsRegistryUrl(pkg);
    } else {
      await bundleByResolvedPath(pkg);
    }
    addition(getBundleName(pkg));
  };

  const unbundlePackage = async (tarPath: string) => {
    const tarName = relative(bundlePath, tarPath);
    verbose(`unbundling ${tarName}`);
    await rmFile(tarPath);
    removal(tarName);
  };

  const rewritePackage = async (pkg: IPackage) => {
    if (decompress) {
      verbose(`hashing ${getBundleName(pkg)}`);
      const tarIntegrity = await getIntegrity(getBundlePath(pkg));
      pkg.node.integrity = `${pkg.node.integrity} ${tarIntegrity}`;
    }
    pkg.node.resolved = getResolvedPath(pkg);
  };

  const bundledFiles = await rmDir(bundlePath);
  const bundledFilesByBundlePath = groupBy<string>((location: string) => location, bundledFiles);
  const packages = getPackages(lockfile);
  const packagesByBundlePath = groupBy<IPackage>(getBundlePath, packages);
  const packagesUnbundled = packages.filter(isUnbundled);
  const packagesNotNeeded = bundledFiles.filter(isTarPath).filter(isUnusedFile);

  await when.all(packagesUnbundled.map(bundlePackage));
  await when.all(packagesUnbundled.map(decompressPackage));
  await when.all(packagesNotNeeded.map(unbundlePackage));

  const tempFiles = (await rmDir(bundlePath)).filter(isTarPath).filter(isUnusedFile);
  await when.all(tempFiles.map(rmFile));

  info(`rewriting ${packageLockPath}`);
  await when.all(packages.map(rewritePackage));
  await write(packageLockPath, lockfile);

  const added = chalk.green(`+${packagesUnbundled.length}`);
  const removed = chalk.red(`-${packagesNotNeeded.length}`);
  const timeTaken = chalk.grey(getTimeBetween(startTime, new Date()));

  console.info('shrinkpack %s %s %s', added, removed, timeTaken);
};
