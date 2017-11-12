import { join } from 'path';
import { exec } from './child-process';
import * as log from './log';

export default async (): Promise<string> => {
  try {
    const UTF8 = { encoding: 'utf8' };
    const { stdout: cachePath } = await exec('npm config get cache', UTF8);
    return join(cachePath, '_cacache');
  } catch (err) {
    log.bug(`failed to read "npm config get cache"`, err);
    process.exit(1);
    return '';
  }
};
