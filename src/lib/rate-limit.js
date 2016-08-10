// 3rd party modules
var guard = require('when/guard');

// public
module.exports = rateLimit;

// implementation
var condition = guard.n(10);

function rateLimit(fn) {
  return guard(condition, fn);
}
