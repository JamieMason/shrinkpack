import cacache from 'cacache';
import * as fs from './fs';
import * as log from './log';

export default async (cachePath, cacheKey, tarPath) => {
  try {
    const tarContents = await fs.readFile(tarPath);
    const integrityHash = await cacache.put(cachePath, cacheKey, tarContents);
    return integrityHash;
  } catch (err) {
    log.bug(`failed to add ${tarPath} to zkat/cacache`, err);
    process.exit(1);
  }
};
