// modules
var copyFile = require('../../lib/copy-file');

// public
module.exports = bundle;

// implementation
function bundle(dependency) {
  return copyFile(dependency.getPathToNpmCache(), dependency.getPathToBundle())
    .then(onSuccess, onError);

  function onSuccess() {
    return dependency;
  }

  function onError() {
    throw new Error('! failed to shrinkpack ' + dependency.getId());
  }
}
