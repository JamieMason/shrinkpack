// node modules
var zlib = require('zlib');

// 3rd party modules
var chalk = require('chalk');
var fs = require('graceful-fs');
var when = require('when');

// modules
var rateLimit = require('./rate-limit');

// public
module.exports = rateLimit(copyFile);

// implementation
function copyFile(source, target) {
  return when.promise(function (resolve, reject) {
    var read$ = fs.createReadStream(source);
    var write$ = fs.createWriteStream(target);

    read$.on('error', onReadError);
    write$.on('error', onWriteError);
    write$.on('finish', onWriteEnd);

    if (isCompressed()) {
      read$.pipe(write$);
    } else {
      read$.pipe(zlib.createGunzip()).pipe(write$);
    }

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

    function isCompressed() {
      return target.search(/\.tar$/) === -1;
    }
  });
}
