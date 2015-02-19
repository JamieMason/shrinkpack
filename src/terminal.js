'use strict';

var when = require('when');
var guard = require('when/guard');
var child = require('child_process');
var maxConcurrent = 10;

module.exports = {

  exec: guard(guard.n(maxConcurrent), function(command) {

    return when.promise(function(resolve, reject) {

      child.exec(command, function(err, stdout, stderr) {
        if (err !== null) {
          reject({
            err: err,
            stderr: stderr.trim()
          });
        } else {
          resolve(stdout.trim());
        }
      });

    });

  })

};
