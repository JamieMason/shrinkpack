// 3rd party modules
var execa = require('execa');

// modules
var rateLimit = require('./rate-limit');

// public
module.exports = {
  exec: rateLimit(execa.shell),
  spawn: execa
};
