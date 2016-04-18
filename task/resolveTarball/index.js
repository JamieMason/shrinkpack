// 3rd party modules
var chalk = require('chalk');

// modules
var resolveLocally = require('./resolveLocally');
var resolveRemotely = require('./resolveRemotely');

// public
module.exports = resolveTarball;

// implementation
function resolveTarball (deps) {
  return Promise.all(deps.map(resolveDep));
}

function resolveDep (dep) {
  return resolveLocally(dep)
    .then(onLocalAttempt)
    .then(onFinalAttempt);

  function onLocalAttempt (tarballUrl) {
    return tarballUrl || resolveRemotely(dep);
  }

  function onFinalAttempt (tarballUrl) {
    if (tarballUrl) {
      dep.shrinkwrap.resolved = tarballUrl;
      console.info(chalk.green('✓ set missing "resolved" property for %s to %s'), dep.id, tarballUrl);
    } else {
      console.error(chalk.red('! failed to resolve tarball for %s'), dep.id);
      process.exit(1);
    }
  }
}
