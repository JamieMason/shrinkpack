import fs from 'graceful-fs';
import whenNode from 'when/node';
import rateLimit from './rate-limit';

export default {
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
