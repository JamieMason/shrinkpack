// 3rd party modules
var chalk = require('chalk');

// modules
var copyFile = require('./lib/copyFile');

// public
module.exports = addToBundle;

// implementation
function addToBundle (deps) {
  return Promise.all(deps.map(bundlePackage));
}

function bundlePackage (dep) {
  return copyFile(dep.tarball.npm, dep.tarball.shrinkpack)
    .then(success, fail);

  function success () {
    console.info(chalk.green('+ %s'), dep.id);
  }

  function fail (err) {
    console.error(chalk.red('failed to shrinkpack %s'), dep.id);
    throw new Error(err.toString());
  }
}
