// 3rd party modules
var execa = require('execa');
var guard = require('when/guard');

// modules
var rateLimit = require('./rate-limit');

// public
module.exports = {
  exec: guard(rateLimit, execa.shell),
  spawn: execa.spawn
};
