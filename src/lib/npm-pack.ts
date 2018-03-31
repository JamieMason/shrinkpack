import { guard, limitTo, spawn } from './io';
import { bug } from './log';

const rateLimit = limitTo(12);

export const guardedNpmPack = async (cachePath: string, locator: string) => {
  try {
    await spawn('npm', ['pack', locator], {
      cwd: cachePath
    });
  } catch (err) {
    bug(`failed to "npm pack ${locator}"`, err);
  }
};

export const npmPack: typeof guardedNpmPack = guard(rateLimit, guardedNpmPack);
