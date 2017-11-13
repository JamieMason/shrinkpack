import * as ssri from 'ssri';
import * as fs from './fs';
import * as log from './log';

export default async (tarPath: string): Promise<string> => {
  try {
    const tarContents = await fs.readFile(tarPath);
    const integrity = ssri.fromData(tarContents);
    return ssri.stringify(integrity);
  } catch (err) {
    log.bug(`failed to get hash integrity of ${tarPath} from zkat/ssri`, err);
    return '';
  }
};
