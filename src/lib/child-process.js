// 3rd party modules
var childProcess = require('child_process');
var guard = require('when/guard');
var whenNode = require('when/node');

// modules
var rateLimit = require('./rate-limit');

// public
module.exports = {
  exec: wrap(childProcess.exec),
  spawn: childProcess.spawn
};

function wrap(fn) {
  return guard(rateLimit, whenNode.lift(fn));
}
