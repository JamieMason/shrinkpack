// 3rd party modules
var chalk = require('chalk');
var glob = require('glob');

// public
module.exports = resolveTarball;

// implementation
function resolveTarball (deps) {
  return Promise.all(deps.map(resolvePackage));
}

function resolvePackage (dep) {
  return new Promise(function (resolve, reject) {
    var pkgPath = getPkgPath(dep);
    var pkgJson = getPkgJson(pkgPath);
    if (pkgJson && pkgJson.dist && pkgJson.dist.tarball) {
      dep.shrinkwrap.resolved = pkgJson.dist.tarball;
      console.info(chalk.green('✓ set missing "resolved" property for %s to %s'), dep.id, dep.shrinkwrap.resolved);
      resolve();
    } else {
      console.error(chalk.red('failed to resolve tarball for %s'), dep.id);
      reject();
    }
  });
}

function getPkgJson (pkgPath) {
  return pkgPath ? require(pkgPath) : {
    dist: {
      tarball: ''
    }
  };
}

function getPkgPath (dep) {
  return glob.sync('node_modules/**/' + dep.name + '/**/package.json', {
    realpath: true
  })[0] || '';
}
