// 3rd party modules
var chalk = require('chalk');
var glob = require('glob');
var path = require('path');

// public
module.exports = getPkgPathNpm2;

// implementation
var pkgPathByName = null;

function getPkgPathNpm2 (dep) {
  return pkgPathByName
    ? getPkgPath(dep)
    : buildIndex(dep).then(getPkgPath.bind(null, dep));
}

function buildIndex (dep, done) {
  console.info(chalk.gray('? indexing package.json files... (not needed in npm3+)'), dep.id);
  return new Promise(function (resolve) {
    var files = glob.sync('node_modules/**/package.json');
    pkgPathByName = files.reduce(addPathToIndex, {});
    resolve();

    function addPathToIndex (index, pkgPath) {
      var name = pkgPath.replace('/package.json', '').replace(/.*\//, '');
      index[name] = pkgPath;
      return index;
    }
  });
}

function getPkgPath (dep) {
  var pkgPath = pkgPathByName[dep.name];
  return Promise.resolve(pkgPath ? path.resolve(pkgPath) : '');
}
