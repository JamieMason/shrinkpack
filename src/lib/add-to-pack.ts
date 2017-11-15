import { spawn } from './child-process';
import { bug } from './log';

export const addToPack = async (packPath: string, identifier: string) => {
  try {
    await spawn('npm', ['pack', identifier], { cwd: packPath });
  } catch (err) {
    bug(`failed to "npm pack ${identifier}"`, err);
  }
};
