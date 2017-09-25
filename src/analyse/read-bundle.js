// Node modules
var path = require('path');

// Modules
var fs = require('../lib/fs');

// Public
module.exports = readBundle;

// Implementation
function readBundle(pathToBundle) {
  return fs.readdir(pathToBundle).then(onSuccess, onError);

  function onSuccess(filenames) {
    return filenames
      .map(getAbsolutePath)
      .filter(isTarFile)
      .reduce(indexByPath, {});
  }

  function getAbsolutePath(filename) {
    return path.join(pathToBundle, filename);
  }

  function isTarFile(filename) {
    return /\.(tar|tgz)$/.test(filename);
  }

  function indexByPath(index, filename) {
    index[filename] = true;
    return index;
  }

  function onError() {
    throw new Error('! failed to read contents of node_shrinkwrap');
  }
}
