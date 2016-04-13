// 3rd party modules
var chalk = require('chalk');
var fs = require('graceful-fs');

// public
module.exports = removeFromBundle;

// implementation
function removeFromBundle (deps) {
  return Promise.all(deps.map(removeFile));
}

function removeFile (dep) {
  return new Promise(function (resolve, reject) {
    fs.unlink(dep.tarball.shrinkpack, function onRemoveFile (err) {
      if (err) {
        reject(err);
      } else {
        console.info(chalk.red('- %s'), dep.id);
        resolve();
      }
    });
  });
}
