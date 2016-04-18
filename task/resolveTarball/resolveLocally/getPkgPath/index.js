// modules
var npm2 = require('./npm2');
var npm3 = require('./npm3');

// public
module.exports = getPkgPath;

// implementation
function getPkgPath (dep) {
  return npm3(dep)
    .then(onNpm3)
    .then(onNpm2);

  function onNpm3 (pkgPath) {
    return pkgPath || npm2(dep);
  }

  function onNpm2 (pkgPath) {
    return pkgPath;
  }
}
