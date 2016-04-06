'use strict';

// 3rd party modules

var fs = require('fs');
var when = require('when');

// public

module.exports = {
  copy: copyFile,
  remove: removeFile,
  write: writeFile
};

// implementation

function copyFile (source, target) {
  return when.promise(promiseFileCopy);

  function promiseFileCopy (resolve, reject, notify) {
    var readStream = fs.createReadStream(source);
    var writeStream = fs.createWriteStream(target);

    notify(source);

    readStream.on('error', onReadError);
    writeStream.on('error', onWriteError);
    writeStream.on('finish', onWriteEnd);

    readStream.pipe(writeStream);

    function onReadError (err) {
      reject('error reading ' + source + ': ' + String(err));
    }

    function onWriteError (err) {
      reject('error writing ' + target + ': ' + String(err));
    }

    function onWriteEnd () {
      resolve(source);
    }
  }
}

function removeFile (source) {
  return when.promise(promiseFileRemove);

  function promiseFileRemove (resolve, reject, notify) {
    notify(source);
    fs.unlink(source, onFileRemove);

    function onFileRemove (err) {
      if (err) {
        reject(String(err));
      } else {
        resolve(source);
      }
    }
  }
}

function writeFile (target, contents) {
  return when.promise(promiseFileWrite);

  function promiseFileWrite (resolve, reject, notify) {
    notify(target);
    fs.writeFile(target, contents, 'utf8', onFileWrite);

    function onFileWrite (err) {
      if (err) {
        reject(String(err));
      } else {
        resolve(target);
      }
    }
  }
}
