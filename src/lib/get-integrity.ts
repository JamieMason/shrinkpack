import { readFile } from './fs';
import { bug } from './log';
const ssri = require('ssri');

export default async (tarPath: string): Promise<string> => {
  try {
    const tarContents = await readFile(tarPath);
    const integrity = ssri.fromData(tarContents);
    return ssri.stringify(integrity);
  } catch (err) {
    bug(`failed to get hash integrity of ${tarPath} from zkat/ssri`, err);
    return '';
  }
};
