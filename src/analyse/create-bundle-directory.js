import fs from '../lib/fs';

export default createBundleDirectory;

function createBundleDirectory(location) {
  return fs.mkdir(location).then(onSuccess, onError);

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
