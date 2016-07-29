// 3rd party modules
var fs = require('graceful-fs');
var whenNode = require('when/node');

// public
module.exports = createBundleDirectory;

// implementation
function createBundleDirectory (location) {
  return whenNode.call(fs.mkdir, location)
    .then(onSuccess, onError);

  function onSuccess () {
    return location;
  }

  function onError (err) {
    if (err.code !== 'EEXIST') {
      throw new Error('! failed to create node_shrinkwrap directory');
    }
    return location;
  }
}
