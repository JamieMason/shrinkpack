import path from 'path';
import childProcess from '../lib/child-process';

export default getPaths;

function getPaths(directory) {
  return childProcess
    .exec('npm config get cache', { encoding: 'utf8' })
    .then(onSuccess, onError);

  function onSuccess(result) {
    return {
      graph: path.join(directory, 'npm-shrinkwrap.json'),
      manifest: path.join(directory, 'package.json'),
      npmCache: result.stdout,
      project: directory,
      shrinkpack: path.join(directory, 'node_shrinkwrap')
    };
  }

  function onError() {
    throw new Error('! failed to locate the npm cache');
  }
}
