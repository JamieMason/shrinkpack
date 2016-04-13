// 3rd party modules
var chalk = require('chalk');
var shell = require('./lib/shell');

// public
module.exports = addToCache;

// implementation
function addToCache (deps) {
  return Promise.all(deps.map(cachePackage));
}

function cachePackage (dep) {
  console.info(chalk.yellow('↓ %s from %s'), dep.id, dep.shrinkwrap.resolved);
  return shell('npm cache add ' + dep.shrinkwrap.resolved)
    .catch(fail);

  function fail (err) {
    console.error(chalk.red('failed to download %s'), dep.id);
    throw err;
  }
}
