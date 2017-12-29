import { Json } from '../typings';
import { readFile, writeFile } from './io';
import { bug, verbose } from './log';

export const read = async (path: string): Promise<Json> => {
  try {
    const json = await readFile(path, { encoding: 'utf8' });
    return JSON.parse(json);
  } catch (err) {
    verbose(`unable to read JSON from ${path}, returning null`);
    return null;
  }
};

export const write = async (path: string, contents: Json): Promise<void> => {
  try {
    const json = JSON.stringify(contents, null, 2);
    await writeFile(path, json, { encoding: 'utf8' });
  } catch (err) {
    bug(`failed to write ${path}`, err);
  }
};
