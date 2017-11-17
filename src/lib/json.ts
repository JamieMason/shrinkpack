import { Json } from '../typings';
import { readFile, writeFile } from './fs';
import { bug, verbose } from './log';

export const read = async (filePath: string): Promise<Json> => {
  try {
    const json = await readFile(filePath, { encoding: 'utf8' });
    return JSON.parse(json);
  } catch (err) {
    verbose(`unable to read JSON from ${filePath}, returning null`);
    return null;
  }
};

export const write = async (filePath: string, contents: Json): Promise<void> => {
  try {
    const json = JSON.stringify(contents, null, 2);
    await writeFile(filePath, json, { encoding: 'utf8' });
  } catch (err) {
    bug(`failed to write ${filePath}`, err);
  }
};
