import path from 'path';
import cacache from 'cacache';
import { exec } from './lib/child-process';

const clearCache = async () => {
  const UTF8 = { encoding: 'utf8' };
  const { stdout: pathToCache } = await exec('npm config get cache', UTF8);
  const pathToCacache = path.join(pathToCache, '_cacache');
  await cacache.rm.all(pathToCacache);
};

clearCache();
