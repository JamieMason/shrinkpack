// 3rd party modules
var fs = require('graceful-fs');
var guard = require('when/guard');

// public
module.exports = guard(guard.n(10), removeFile);

// implementation
function removeFile (source) {
  return new Promise(function (resolve, reject) {
    fs.unlink(source, function onRemoveFile (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
