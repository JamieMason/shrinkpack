import path from 'path';
import fs from '../lib/fs';

export default readBundle;

function readBundle(pathToBundle) {
  return fs.readdir(pathToBundle).then(indexByPath, onError);

  function indexByPath(filenames) {
    return filenames.reduce((memo, filename) => {
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
