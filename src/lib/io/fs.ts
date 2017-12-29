import * as fse from 'fs-extra';
import { join } from 'path';
import { bug } from '../log';

export const readFile = fse.readFile;
export const writeFile = fse.writeFile;

export const mkdir: typeof fse.mkdir = async (path: string | Buffer) => {
  try {
    await fse.mkdir(path);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      bug(`failed to create directory ${path}`, err);
    }
  }
};

export const readdir: typeof fse.readdir = async (path: string | Buffer) => {
  try {
    const contents = await fse.readdir(path as string);
    return contents.map((filename: string) => join(path as string, filename));
  } catch (err) {
    bug(`failed to read contents of directory "${path as string}"`, err);
    return [];
  }
};

export const unlink: typeof fse.unlink = async (path: string | Buffer) => {
  try {
    await fse.unlink(path);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      bug(`failed to delete ${path}`, err);
    }
  }
};
