import { spawn } from './io';
import { bug } from './log';

export const npmPack = async (cachePath: string, locator: string) => {
  try {
    await spawn('npm', ['pack', locator], {
      cwd: cachePath,
      stdio: ['pipe', 'pipe', 'inherit']
    });
  } catch (err) {
    bug(`failed to "npm pack ${locator}"`, err);
  }
};
