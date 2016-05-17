// 3rd party modules
var fs = require('fs');
var path = require('path');

// public
module.exports = getPkgPathNpm3;

// implementation
function getPkgPathNpm3 (dep) {
  return new Promise(function (resolve) {
    var pkgPath = path.resolve('node_modules', dep.name, 'package.json');
    fs.access(pkgPath, fs.R_OK, function onFileCheck (err) {
      resolve(err ? '' : pkgPath);
    });
  });
}
