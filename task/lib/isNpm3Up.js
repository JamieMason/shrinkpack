// 3rd party modules
var childProcess = require('child_process');

// public
module.exports = isNpm3Up;

// implementation
function isNpm3Up () {
  return parseFloat(getNpmVersion()) >= 3;
}

function getNpmVersion () {
  return childProcess.execSync('npm --version', {
    encoding: 'utf8'
  }).trim();
}
