// modules
var shell = require('../lib/shell');

// public
module.exports = resolveRemotely;

// implementation
function resolveRemotely (dep) {
  return shell('npm view ' + dep.id + ' --json')
    .then(readPkgJson, fail)
    .catch(fail);

  function fail () {
    return '';
  }
}

function readPkgJson (json) {
  return new Promise(function (resolve) {
    var meta = JSON.parse(json);
    var tarballUrl = meta && meta.dist && meta.dist.tarball
      ? meta.dist.tarball
      : '';
    resolve(tarballUrl);
  });
}
