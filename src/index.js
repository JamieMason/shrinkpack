import path from 'path';

import bluebird from 'bluebird';
import chalk from 'chalk';
import semver from 'semver';

import * as lockfileUtils from './lib/lockfile-utils';
import * as log from './lib/log';
import addToBundle from './lib/add-to-bundle';
import addToCache from './lib/add-to-cache';
import decompressTar from './lib/decompress-tar';
import deleteFile from './lib/delete-file';
import getCachePath from './lib/get-cache-path';
import getTimeBetween from './lib/get-time-between';
import groupBy from './lib/group-by';
import readDirectory from './lib/read-directory';
import readJson from './lib/read-json';
import touchDirectory from './lib/touch-directory';
import writeJson from './lib/write-json';

export default async ({ decompress = true, projectPath = process.cwd() }) => {
  const startTime = new Date();
  const packageLockPath = path.join(projectPath, 'package-lock.json');
  const bundlePath = path.join(projectPath, 'node_shrinkwrap');
  const { cachePath, lockfile } = await bluebird.props({
    cachePath: getCachePath(),
    lockfile: readJson(packageLockPath),
    touchDirectory: touchDirectory(bundlePath)
  });

  const isPackage = ({ node }) => 'integrity' in node;
  const getName = extension => ({ key, node }) => `${key}-${node.version}.${extension}`;
  const getTarName = getName('tar');
  const getTgzName = getName('tgz');
  const getTarPath = pkg => path.join(bundlePath, getTarName(pkg));
  const getTgzPath = pkg => path.join(bundlePath, getTgzName(pkg));
  const getBundleName = pkg => (decompress ? getTarName(pkg) : getTgzName(pkg));
  const getBundlePath = pkg => (decompress ? getTarPath(pkg) : getTgzPath(pkg));
  const getResolvedPath = pkg => `file:node_shrinkwrap/${getBundleName(pkg)}`;
  const getNamedVersion = pkg => `${pkg.key}@${pkg.node.version}`;
  const getCacheKey = pkg => `shrinkpack|${getBundleName(pkg)}`;

  const contains = (substr, str) => String(str).indexOf(substr) !== -1;
  const containsPattern = (regex, str) => String(str).search(regex) !== -1;
  const isRegistryUrl = str => contains('https://registry.npmjs.org', str);
  const isTarPath = str => containsPattern(/\.(tgz|tar)$/, str);
  const isUnusedFile = filePath => filePath in packagesByBundlePath === false;

  const hasVersionAsRegistryUrl = pkg => isRegistryUrl(pkg.node.version);
  const hasVersionAsSemVer = pkg => semver.valid(pkg.node.version);
  const isBundled = pkg => getBundlePath(pkg) in bundledFilesByBundlePath;
  const isUnbundled = pkg => isBundled(pkg) === false;

  const bundleByResolvedPath = pkg => addToBundle(bundlePath, pkg.node.resolved);
  const bundleByVersionAsRegistryUrl = pkg => addToBundle(bundlePath, pkg.node.version);
  const bundleByVersionAsSemVer = pkg => addToBundle(bundlePath, getNamedVersion(pkg));

  const decompressPackage = async pkg => {
    log.verbose(`decompressing ${getBundleName(pkg)}`);
    await decompressTar(getTgzPath(pkg), getTarPath(pkg));
    log.verbose(`hashing ${getBundleName(pkg)}`);
    pkg.tarIntegrity = await addToCache(cachePath, getCacheKey(pkg), getBundlePath(pkg));
  };

  const bundlePackage = async pkg => {
    log.verbose(`bundling ${getBundleName(pkg)}`);
    if (hasVersionAsSemVer(pkg)) {
      await bundleByVersionAsSemVer(pkg);
    } else if (hasVersionAsRegistryUrl(pkg)) {
      await bundleByVersionAsRegistryUrl(pkg);
    } else {
      await bundleByResolvedPath(pkg);
    }
    if (decompress) {
      await decompressPackage(pkg);
    }
    log.addition(getBundleName(pkg));
  };

  const unbundlePackage = async tarPath => {
    const tarName = path.relative(bundlePath, tarPath);
    log.verbose(`unbundling ${tarName}`);
    await deleteFile(tarPath);
    log.removal(tarName);
  };

  const rewritePackage = async pkg => {
    const [tgzIntegrity, tarIntegrity] = pkg.node.integrity.split(' ');
    if (decompress && !pkg.tarIntegrity && !tarIntegrity) {
      log.verbose(`rebundling ${pkg.key} because .tar integrity could not be found`);
      await bundlePackage(pkg);
    }
    pkg.node.integrity = decompress ? `${tgzIntegrity} ${pkg.tarIntegrity}` : tgzIntegrity;
    pkg.node.resolved = getResolvedPath(pkg);
  };

  const bundledFiles = await readDirectory(bundlePath);
  const bundledFilesByBundlePath = groupBy(location => location, bundledFiles);
  const packages = lockfileUtils.toArray(lockfile).filter(isPackage);
  const packagesByBundlePath = groupBy(getBundlePath, packages);
  const packagesUnbundled = packages.filter(isUnbundled);
  const packagesNotNeeded = bundledFiles.filter(isTarPath).filter(isUnusedFile);

  await bluebird.all(packagesUnbundled.map(bundlePackage));
  await bluebird.all(packagesNotNeeded.map(unbundlePackage));

  const tempFiles = (await readDirectory(bundlePath)).filter(isTarPath).filter(isUnusedFile);
  await bluebird.all(tempFiles.map(deleteFile));

  log.info(`rewriting ${packageLockPath}`);
  await bluebird.all(packages.map(rewritePackage));
  await writeJson(packageLockPath, lockfile);

  const added = chalk.green(`+${packagesUnbundled.length}`);
  const removed = chalk.red(`-${packagesNotNeeded.length}`);
  const timeTaken = chalk.grey(getTimeBetween(startTime, new Date()));
  console.info('shrinkpack %s %s %s %s', added, removed, timeTaken);
};
