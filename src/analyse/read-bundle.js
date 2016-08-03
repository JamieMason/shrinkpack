// node modules
var path = require('path');

// modules
var fs = require('../lib/fs');

// public
module.exports = readBundle;

// implementation
function readBundle(pathToBundle) {
  return fs.readdir(pathToBundle)
    .then(indexByPath, onError);

  function indexByPath(filenames) {
    return filenames.reduce(function (memo, filename) {
      memo[getAbsolutePath(filename)] = true;
      return memo;
    }, {});
  }

  function getAbsolutePath(filename) {
    return path.join(pathToBundle, filename);
  }

  function onError() {
    throw new Error('! failed to read contents of node_shrinkwrap');
  }
}
