// 3rd party modules
var exec = require('child_process').exec;
var guard = require('when/guard');

// modules
var rateLimit = require('./rateLimit');

// public
module.exports = guard(rateLimit, shell);

// implementation
function shell (command) {
  return new Promise(function (resolve, reject) {
    exec(command, function onExec (err, stdout) {
      if (err) {
        reject(err);
      } else {
        resolve(String(stdout).trim());
      }
    });
  });
}
