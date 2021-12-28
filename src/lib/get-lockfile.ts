import fs from 'fs';
import { join } from 'path';
import type { Lockfile } from '../@types/lockfile';
import { log } from './log';

/**
 * Look for a package-lock.json or otherwise an npm-shrinkwrap.json within the
 * provided absolute path to a project.
 */
export function getLockfile(
  projectPath: string,
): { lockfilePath: string; lockfile: Lockfile } | never {
  let lockfilePath = join(projectPath, 'package-lock.json');
  let lockfile = readLockfile(lockfilePath);
  if (!lockfile) {
    lockfilePath = join(projectPath, 'npm-shrinkwrap.json');
    lockfile = readLockfile(lockfilePath);
  }
  if (!lockfile) {
    log.error('no package-lock.json or npm-shrinkwrap.json found');
    process.exit(1);
  }
  return {
    lockfilePath,
    lockfile,
  };

  function readLockfile(filePath: string): Lockfile | null | never {
    const sw = readJson(filePath);
    if (!sw) {
      return null;
    }
    if (Number(sw.lockfileVersion) < 2) {
      log.error(
        `expected lockfileVersion to be 2 or greater in ${filePath}\n  npm v7 or greater will create this lockfile version`,
      );
      process.exit(1);
    }
    return sw;
  }

  function readJson(filePath: string): Lockfile | null | never {
    try {
      const json = fs.readFileSync(filePath, { encoding: 'utf8' });
      if (json.includes('git+')) {
        log.error(
          `lockfile contains packages installed directly from git, which is not supported ${filePath}`,
        );
        process.exit(1);
      }
      return JSON.parse(json);
    } catch (err) {
      log.verbose(`no valid lockfile at ${filePath}`);
      return null;
    }
  }
}
