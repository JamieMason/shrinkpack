import fs from './fs';

export default deleteFile;

function deleteFile(location) {
  return fs.unlink(location).then(onSuccess, onError);

  function onSuccess() {
    return location;
  }

  function onError() {
    throw new Error(`! failed to delete ${location}`);
  }
}
