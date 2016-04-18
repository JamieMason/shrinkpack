// 3rd party modules
var chalk = require('chalk');

// modules
var removeFile = require('./lib/removeFile');

// public
module.exports = removeFromBundle;

// implementation
function removeFromBundle (tarPaths) {
  return Promise.all(tarPaths.map(removeDep));
}

function removeDep (tarPath) {
  return removeFile(tarPath)
    .then(success, fail);

  function success () {
    console.info(chalk.red('- %s'), tarPath.replace(/.+\//, ''));
  }

  function fail (err) {
    console.error(chalk.red('! failed to remove %s'), tarPath);
    throw err;
  }
}
