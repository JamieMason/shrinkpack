// 3rd party modules
var chalk = require('chalk');

// modules
var getNpm2PkgPath = require('./npm2');
var getNpm3PkgPath = require('./npm3');
var isNpm3Up = require('../../lib/isNpm3Up');

// public
module.exports = resolveLocally;

// implementation
var getPkgPath = isNpm3Up() ? getNpm3PkgPath : getNpm2PkgPath;

function resolveLocally (dep) {
  return getPkgPath(dep)
    .then(function (pkgPath) {
      if (!pkgPath) {
        console.info(chalk.gray('? %s has no package.json that I can find locally'), dep.id);
        return '';
      }
      return readPkgJson(dep, pkgPath);
    });
}

function readPkgJson (dep, pkgPath) {
  return new Promise(function (resolve) {
    var meta = require(pkgPath);
    if (!meta || !meta.dist || !meta.dist.tarball) {
      console.info(chalk.gray('? %s has no "dist.tarball" in %s'), dep.id, pkgPath);
      resolve('');
    } else {
      resolve(meta.dist.tarball);
    }
  });
}
