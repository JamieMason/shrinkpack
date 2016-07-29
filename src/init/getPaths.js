// 3rd party modules
var childProcess = require('child_process');
var path = require('path');
var whenNode = require('when/node');

// public
module.exports = getPaths;

// implementation
function getPaths (directory) {
  return whenNode.call(childProcess.exec, 'npm config get cache', { encoding: 'utf8' })
    .then(onSuccess, onError);

  function onSuccess (npmCachePath) {
    return {
      graph: path.join(directory, 'npm-shrinkwrap.json'),
      npmCache: npmCachePath.join('').trim(),
      project: directory,
      shrinkpack: path.join(directory, 'node_shrinkwrap')
    };
  }

  function onError () {
    throw new Error('! failed to locate the npm cache');
  }
}
