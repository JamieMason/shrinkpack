// 3rd party modules
var chalk = require('chalk');

// modules
var shell = require('../lib/shell');

// public
module.exports = resolveRemotely;

// implementation
function resolveRemotely (dep) {
  return shell('npm view ' + dep.id + ' --json')
    .then(success, fail)
    .catch(fail);

  function success (json) {
    return readPkgJson(dep, json);
  }

  function fail () {
    return '';
  }
}

function readPkgJson (dep, json) {
  return new Promise(function (resolve) {
    var meta = JSON.parse(json);
    if (!meta || !meta.dist || !meta.dist.tarball) {
      console.info(chalk.gray('? %s has no "dist.tarball" in `npm view %s --json`'), dep.id, dep.id);
      resolve('');
    } else {
      resolve(meta.dist.tarball);
    }
  });
}
