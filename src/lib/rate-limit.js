// 3rd party modules
var guard = require('when/guard');

// Public
module.exports = rateLimit;

// Implementation
var condition = guard.n(10);

function rateLimit(fn) {
  return guard(condition, fn);
}
