import * as fs from './fs';
import * as log from './log';

export default async (location) => {
  try {
    await fs.unlink(location);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      log.bug(`failed to delete ${location}`, err);
      process.exit(1);
    }
  }
};
