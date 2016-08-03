// modules
var fs = require('./fs');

// public
module.exports = deleteFile;

// implementation
function deleteFile(location) {
  return fs.unlink(location)
    .then(onSuccess, onError);

  function onSuccess() {
    return location;
  }

  function onError() {
    throw new Error('! failed to delete ' + location);
  }
}
