// 3rd party modules
var fs = require('graceful-fs');
var guard = require('when/guard');
var whenNode = require('when/node');

// modules
var rateLimit = require('./rate-limit');

// public
module.exports = {
  createReadStream: fs.createReadStream,
  createWriteStream: fs.createWriteStream,
  mkdir: wrap(fs.mkdir),
  readdir: wrap(fs.readdir),
  readFile: wrap(fs.readFile),
  unlink: wrap(fs.unlink),
  writeFile: wrap(fs.writeFile)
};

function wrap(fn) {
  return guard(rateLimit, whenNode.lift(fn));
}
