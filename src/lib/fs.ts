import { join } from 'path';
import { bug } from './log';
import { rateLimit } from './rate-limit';

const fs = require('graceful-fs');
const whenNode = require('when/node');

const toThrottledPromise = <T>(fn: (...args: any[]) => Promise<T>) => rateLimit<T>(whenNode.lift(fn));
const mkdir: (path: string) => Promise<void> = toThrottledPromise<void>(fs.mkdir);
const readdir: (path: string) => Promise<string[]> = toThrottledPromise<string[]>(fs.readdir);
const unlink: (path: string) => Promise<void> = toThrottledPromise<void>(fs.unlink);

export const createReadStream = fs.createReadStream;
export const createWriteStream = fs.createWriteStream;

export const mkDir = async (path: string): Promise<void> => {
  try {
    await mkdir(path);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      bug(`failed to touch directory ${path}`, err);
    }
  }
};

export const readDir = async (path: string): Promise<string[]> => {
  try {
    const contents = await readdir(path);
    return contents.map((filename: string) => join(path, filename));
  } catch (err) {
    bug(`failed to read contents of directory "${path}"`, err);
    return [];
  }
};

export const readFile: (path: string, options?: object) => Promise<string> = toThrottledPromise(fs.readFile);

export const rmFile = async (path: string): Promise<void> => {
  try {
    await unlink(path);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      bug(`failed to delete ${path}`, err);
    }
  }
};

export const writeFile: (path: string, contents: string, options?: object) => Promise<void> = toThrottledPromise(
  fs.writeFile
);
