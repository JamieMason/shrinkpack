import { IExeca, IFragment, IPackage, Shrinkpack } from './typings';

import { join, relative } from 'path';
import { addToBundle } from './lib/add-to-bundle';
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
  const bundlePath = join(projectPath, 'node_shrinkwrap');

  const getKey = (pkg: IPackage) => pkg.key.replace(/@/g, '').replace(/\//g, '-');
  const getName = (extension: string) => (pkg: IPackage): string => `${getKey(pkg)}-${pkg.node.version}.${extension}`;
  const getTarName = getName('tar');
  const getTgzName = getName('tgz');
  const getTarPath = (pkg: IPackage): string => join(bundlePath, getTarName(pkg));
  const getTgzPath = (pkg: IPackage): string => join(bundlePath, getTgzName(pkg));
  const getBundleName = (pkg: IPackage): string => (decompress ? getTarName(pkg) : getTgzName(pkg));
  const getBundlePath = (pkg: IPackage): string => (decompress ? getTarPath(pkg) : getTgzPath(pkg));
  const getResolvedPath = (pkg: IPackage): string => `file:node_shrinkwrap/${getBundleName(pkg)}`;

  const containsPattern = (regex: RegExp, str: string) => String(str).search(regex) !== -1;
  const isTarPath = (str: string): boolean => containsPattern(/\.(tgz|tar)$/, str);
  const isUnusedFile = (filePath: string): boolean => filePath in packagesByBundlePath === false;

  const hasSemVerVersion = (pkg: IPackage): boolean => semver.valid(pkg.node.version);
  const isBundled = (pkg: IPackage): boolean => getBundlePath(pkg) in bundledFilesByBundlePath;
  const isUnbundled = (pkg: IPackage): boolean => isBundled(pkg) === false;
  const isUnresolved = (pkg: IPackage): boolean => !hasSemVerVersion(pkg);
  const isPackage = (pkg: IPackage): boolean => 'resolved' in pkg.node || 'version' in pkg.node;

  const bundlePackage = async (pkg: IPackage) => {
    verbose(`bundling ${getBundleName(pkg)}`);
    await addToBundle(bundlePath, pkg.node.resolved);
    addition(getBundleName(pkg));
  };

  const unbundlePackage = async (tarPath: string) => {
    const tarName = relative(bundlePath, tarPath);
    verbose(`unbundling ${tarName}`);
    await rmFile(tarPath);
    removal(tarName);
  };

  const decompressPackage = async (pkg: IPackage) => {
    if (decompress) {
      verbose(`decompressing ${getBundleName(pkg)}`);
      await decompressTar(getTgzPath(pkg), getTarPath(pkg));
    }
  };

  const rewritePackage = async (pkg: IPackage) => {
    if (decompress) {
      verbose(`hashing ${getBundleName(pkg)}`);
      const tarIntegrity = await getIntegrity(getBundlePath(pkg));
      pkg.node.integrity = `${pkg.node.integrity} ${tarIntegrity}`;
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

  await mkDir(bundlePath);
  const lockfile = await locate(projectPath);

  if (lockfile === null) {
    error('unable to continue without an npm-shrinkwrap.json or package-lock.json');
    process.exit(1);
  }

  const bundledFiles = await readDir(bundlePath);
  const bundledFilesByBundlePath = groupBy<string>((location: string) => location, bundledFiles);
  const packages = getPackages(lockfile.data).filter(isPackage);

  await when.all(packages.filter(isUnresolved).map(resolvePackage));

  const packagesByBundlePath = groupBy<IPackage>(getBundlePath, packages);
  const unbundledPackages = packages.filter(isUnbundled);
  const packagesNotNeeded = bundledFiles.filter(isTarPath).filter(isUnusedFile);

  await when.all(unbundledPackages.map(bundlePackage));
  await when.all(unbundledPackages.map(decompressPackage));
  await when.all(packagesNotNeeded.map(unbundlePackage));

  const tempFiles = (await readDir(bundlePath)).filter(isTarPath).filter(isUnusedFile);
  await when.all(tempFiles.map(rmFile));

  info(`rewriting ${lockfile.location}`);
  await when.all(packages.map(rewritePackage));
  await write(lockfile.location, lockfile.data);

  const added = chalk.green(`+${unbundledPackages.length}`);
  const removed = chalk.red(`-${packagesNotNeeded.length}`);
  const timeTaken = chalk.grey(getTimeBetween(startTime, new Date()));

  console.info('shrinkpack %s %s %s', added, removed, timeTaken);
};
