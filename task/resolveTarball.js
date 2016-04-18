// 3rd party modules
var chalk = require('chalk');
var glob = require('glob');

// modules
var shell = require('./lib/shell');

// public
module.exports = resolveTarball;

// implementation
function resolveTarball (deps) {
  return Promise.all(deps.map(resolveLocally));
}

function resolveLocally (dep) {
  return new Promise(function (resolve, reject) {
    var pkgPath = getPkgPath(dep);
    var pkgJson = getPkgJson(pkgPath);
    if (pkgJson && pkgJson.dist && pkgJson.dist.tarball) {
      dep.shrinkwrap.resolved = pkgJson.dist.tarball;
      console.info(chalk.green('✓ set missing "resolved" property for %s to %s'), dep.id, dep.shrinkwrap.resolved);
      resolve();
    } else {
      console.info(chalk.gray('? %s has no "dist.tarball" in package.json, trying npm registry...'), dep.id);
      resolveRemotely(dep)
        .then(resolve, reject);
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
  var depPackagePath = "node_modules/" + dep.name + "/package.json";
  var result = '';
  
  try {
    // Assume the file is directly located at the top of /node_modules, in
    // which case we can just access it directly.
    fs.accessSync(depPackagePath, fs.F_OK);
    result = fs.realpathSync(depPackagePath);
  } 
  catch (e) {
    // It isn't accessible directly.  Perhaps the package is nested somewhere
    // under /node_modules, so we'll need to do a deeper search.
    result = glob.sync('node_modules/**/' + dep.name + '/package.json', {
      realpath: true
    })[0] || '';
  }
  
  return result;
}

function resolveRemotely (dep) {
  return shell('npm view ' + dep.id + ' --json')
    .then(success, fail)
    .catch(fail);

  function success (stdout) {
    dep.shrinkwrap.resolved = JSON.parse(stdout).dist.tarball;
    console.info(chalk.green('✓ set missing "resolved" property for %s to %s'), dep.id, dep.shrinkwrap.resolved);
  }

  function fail (err) {
    console.error(chalk.red('! failed to resolve tarball for %s'), dep.id);
    throw err;
  }
}
