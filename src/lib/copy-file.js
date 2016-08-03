// 3rd party modules
var chalk = require('chalk');
var fs = require('graceful-fs');

// public
module.exports = copyFile;

// implementation
function copyFile(source, target) {
  return new Promise(function (resolve, reject) {
    var read$ = fs.createReadStream(source);
    var write$ = fs.createWriteStream(target);

    read$.on('error', onReadError);
    write$.on('error', onWriteError);
    write$.on('finish', onWriteEnd);
    read$.pipe(write$);

    function onReadError(err) {
      console.error(chalk.red('! failed to read file %s'), source);
      reject(err);
    }

    function onWriteError(err) {
      console.error(chalk.red('! failed to write file %s'), target);
      reject(err);
    }

    function onWriteEnd() {
      resolve();
    }
  });
}
