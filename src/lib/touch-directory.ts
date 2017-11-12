import * as fs from './fs';
import * as log from './log';

export default async (location) => {
  try {
    await fs.mkdir(location);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      log.bug(`failed to touch directory ${location}`, err);
      process.exit(1);
    }
  }
};