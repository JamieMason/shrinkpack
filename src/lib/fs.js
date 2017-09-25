// 3rd party modules
var fs = require('graceful-fs');
var whenNode = require('when/node');

// Modules
var rateLimit = require('./rate-limit');

// Public
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
  return rateLimit(whenNode.lift(fn));
}
