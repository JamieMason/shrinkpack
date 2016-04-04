var exec = require('child_process').exec;
var when = require('when');

module.exports = executeShellScript;

function executeShellScript (command) {
  return when.promise(function (resolve, reject, notify) {
    exec(command, function onExec (err, stdout, stderr) {
      if (err) {
        reject(err);
      } else if (stderr) {
        reject(err);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}
