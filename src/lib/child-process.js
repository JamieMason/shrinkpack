// 3rd party modules
var execa = require('execa');

// Modules
var rateLimit = require('./rate-limit');

// Public
module.exports = {
  exec: rateLimit(execa.shell),
  spawn: execa
};
