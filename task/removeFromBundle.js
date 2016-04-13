// 3rd party modules
var chalk = require('chalk');

// modules
var removeFile = require('./lib/removeFile');

// public
module.exports = removeFromBundle;

// implementation
function removeFromBundle (deps) {
  return Promise.all(deps.map(removeDep));
}

function removeDep (dep) {
  return removeFile(dep.tarball.shrinkpack)
    .then(success, fail);

  function success () {
    console.info(chalk.red('- %s'), dep.id);
  }

  function fail (err) {
    console.error(chalk.red('! failed to remove %s'), dep.id);
    throw err;
  }
}
