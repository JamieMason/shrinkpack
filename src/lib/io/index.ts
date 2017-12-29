import { spawn as childProcessSpawn } from './child-process';
import { decompressTar as tarDecompress } from './decompress-tar';
import {
  mkdir as fsMkdir,
  readdir as fsReaddir,
  readFile as fsReadFile,
  unlink as fsUnlink,
  writeFile as fsWriteFile
} from './fs';
import { guard, limitTo } from './guard';

const rateLimit = limitTo(12);

export const decompressTar: typeof tarDecompress = guard(rateLimit, tarDecompress);
export const mkdir: typeof fsMkdir = guard(rateLimit, fsMkdir);
export const readdir: typeof fsReaddir = guard(rateLimit, fsReaddir);
export const readFile: typeof fsReadFile = guard(rateLimit, fsReadFile);
export const spawn: typeof childProcessSpawn = guard(rateLimit, childProcessSpawn);
export const unlink: typeof fsUnlink = guard(rateLimit, fsUnlink);
export const writeFile: typeof fsWriteFile = guard(rateLimit, fsWriteFile);
