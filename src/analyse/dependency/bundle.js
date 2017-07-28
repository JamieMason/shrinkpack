import copyFile from '../../lib/copy-file';

export default bundle;

function bundle(dependency) {
  return copyFile(
    dependency.getPathToNpmCache(),
    dependency.getPathToBundle()
  ).then(onSuccess, onError);

  function onSuccess() {
    return dependency;
  }

  function onError() {
    throw new Error(`! failed to shrinkpack ${dependency.getId()}`);
  }
}
