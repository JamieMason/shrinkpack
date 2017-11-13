import { join } from 'path';
import * as fs from './fs';
import * as log from './log';

export default async (location: string): Promise<string[]> => {
  try {
    return (await fs.readdir(location)).map((filename: string) => join(location, filename));
  } catch (err) {
    log.bug(`failed to read contents of directory "${location}"`, err);
    return [];
  }
};
