// node modules
var path = require('path');

// modules
var childProcess = require('../lib/child-process');

// public
module.exports = getPaths;

// implementation
function getPaths(directory) {
  return childProcess.exec('npm config get cache', {encoding: 'utf8'})
    .then(onSuccess, onError);

  function onSuccess(npmCachePath) {
    return {
      graph: path.join(directory, 'npm-shrinkwrap.json'),
      manifest: path.join(directory, 'package.json'),
      npmCache: npmCachePath.join('').trim(),
      project: directory,
      shrinkpack: path.join(directory, 'node_shrinkwrap')
    };
  }

  function onError() {
    throw new Error('! failed to locate the npm cache');
  }
}
