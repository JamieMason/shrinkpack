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
      return pkgPath ? readPkgJson(pkgPath) : '';
    });
}

function readPkgJson (pkgPath) {
  return new Promise(function (resolve) {
    var meta = require(pkgPath);
    var tarballUrl = meta && meta.dist && meta.dist.tarball
      ? meta.dist.tarball
      : '';
    resolve(tarballUrl);
  });
}
