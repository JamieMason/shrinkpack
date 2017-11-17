import { readFile } from './fs';
import { bug } from './log';

const ssri = require('ssri');

export const getIntegrity = async (filePath: string): Promise<string> => {
  try {
    const data = await readFile(filePath);
    const integrity = ssri.fromData(data);
    return ssri.stringify(integrity);
  } catch (err) {
    bug(`failed to get hash integrity of ${filePath} from zkat/ssri`, err);
    return '';
  }
};
