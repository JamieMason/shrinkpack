import { spawn } from './child-process';
import { bug } from './log';

export const addToBundle = async (bundlePath: string, identifier: string) => {
  try {
    await spawn('npm', ['pack', identifier], { cwd: bundlePath });
  } catch (err) {
    bug(`failed to "npm pack ${identifier}"`, err);
  }
};
