import path from 'path';
import * as log from './log';
import { exec } from './child-process';

export default async () => {
  try {
    const UTF8 = { encoding: 'utf8' };
    const { stdout: cachePath } = await exec('npm config get cache', UTF8);
    return path.join(cachePath, '_cacache');
  } catch (err) {
    log.bug(`failed to read "npm config get cache"`, err);
    process.exit(1);
  }
};
