import path from 'path';
import * as fs from './fs';
import * as log from './log';

export default async location => {
  try {
    return (await fs.readdir(location)).map(filename => path.join(location, filename));
  } catch (err) {
    log.bug(`failed to read contents of directory "${location}"`, err);
    process.exit(1);
  }
};
