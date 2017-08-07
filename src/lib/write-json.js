import * as fs from './fs';
import * as log from './log';

export default async (location, contents) => {
  try {
    const json = JSON.stringify(contents, null, 2);
    return await fs.writeFile(location, json, { encoding: 'utf8' });
  } catch (err) {
    log.bug(`failed to write ${location}`, err);
    process.exit(1);
  }
};
