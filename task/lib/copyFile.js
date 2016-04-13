// 3rd party modules
var chalk = require('chalk');
var fs = require('graceful-fs');
var guard = require('when/guard');

// public
module.exports = guard(guard.n(10), copyFile);

// implementation
function copyFile (source, target) {
  return new Promise(function (resolve, reject) {
    var readStream = fs.createReadStream(source);
    var writeStream = fs.createWriteStream(target);

    readStream.on('error', onReadError);
    writeStream.on('error', onWriteError);
    writeStream.on('finish', onWriteEnd);
    readStream.pipe(writeStream);

    function onReadError (err) {
      console.error(chalk.red('unable to read file %s'), source);
      reject(err);
    }

    function onWriteError (err) {
      console.error(chalk.red('unable to write file %s'), target);
      reject(err);
    }

    function onWriteEnd () {
      resolve();
    }
  });
}
