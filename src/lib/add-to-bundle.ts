import { spawn } from './child-process';
import * as log from './log';

export default async (bundlePath, identifier) => {
  try {
    await spawn('npm', ['pack', identifier], { cwd: bundlePath });
  } catch (err) {
    log.bug(`failed to "npm pack ${identifier}"`, err);
    process.exit(1);
  }
};
