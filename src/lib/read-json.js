import * as fs from './fs';
import * as log from './log';
import parseJson from './parse-json';

export default async location => {
  try {
    const json = await fs.readFile(location, { encoding: 'utf8' });
    return parseJson(json);
  } catch (err) {
    log.error(`unable to read file ${location}`, err);
    process.exit(1);
  }
};
