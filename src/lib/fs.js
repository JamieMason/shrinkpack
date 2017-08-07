import fs from 'graceful-fs';
import whenNode from 'when/node';
import rateLimit from './rate-limit';

const toThrottledPromise = fn => rateLimit(whenNode.lift(fn));

export const createReadStream = fs.createReadStream;
export const createWriteStream = fs.createWriteStream;
export const mkdir = toThrottledPromise(fs.mkdir);
export const readdir = toThrottledPromise(fs.readdir);
export const readFile = toThrottledPromise(fs.readFile);
export const unlink = toThrottledPromise(fs.unlink);
export const writeFile = toThrottledPromise(fs.writeFile);
