// modules
var fs = require('../lib/fs');

// public
module.exports = createBundleDirectory;

// implementation
function createBundleDirectory(location) {
  return fs.mkdir(location)
    .then(onSuccess, onError);

  function onSuccess() {
    return location;
  }

  function onError(err) {
    if (err.code !== 'EEXIST') {
      throw new Error('! failed to create node_shrinkwrap directory');
    }
    return location;
  }
}
