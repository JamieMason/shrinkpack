// modules
var childProcess = require('../lib/child-process');

// public
module.exports = getNpmVersion;

// implementation
function getNpmVersion() {
  return childProcess.exec('npm --version', {encoding: 'utf8'})
    .then(onSuccess, onError);

  function onSuccess(npmVersion) {
    return npmVersion.join('').trim();
  }

  function onError() {
    throw new Error('! failed to determine version of npm');
  }
}
