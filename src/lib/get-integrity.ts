import { IIntegrity, ISsri } from '../typings';
import { readFile } from './fs';
import { bug } from './log';

const ssri: ISsri = require('ssri');

export const getIntegrity = async (filePath: string): Promise<IIntegrity> => {
  try {
    const data = await readFile(filePath);
    return ssri.fromData(data);
  } catch (err) {
    bug(`failed to get hash integrity of ${filePath} from zkat/ssri`, err);
    return ssri.parse('');
  }
};
