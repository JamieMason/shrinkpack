import { Json } from '../typings';
import { readFile, writeFile } from './fs';
import { bug, error, verbose } from './log';

export const read = async (location: string): Promise<Json> => {
  try {
    const json = await readFile(location, { encoding: 'utf8' });
    return JSON.parse(json);
  } catch (err) {
    verbose(`unable to read JSON from ${location}, returning null`);
    return null;
  }
};

export const write = async (location: string, contents: Json): Promise<void> => {
  try {
    const json = JSON.stringify(contents, null, 2);
    await writeFile(location, json, { encoding: 'utf8' });
  } catch (err) {
    bug(`failed to write ${location}`, err);
  }
};
