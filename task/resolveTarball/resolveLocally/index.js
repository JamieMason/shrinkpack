// modules
var getPkgPath = require('./getPkgPath');

// public
module.exports = resolveLocally;

// implementation
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
