import fs from 'fs';
import ssri from 'ssri';
import { log } from './log';

/**
 * When shrinkpack is run and a tarball is already in the node_shrinkpack
 * directory, we still need to read the file to find its SSRI (Standard
 * Subresource Integrity) so that it can be set on the packages .integrity
 * property in the lockfile.
 *
 * @param filePath /Users/you/my-project/node_shrinkpack/shrinkpack-0.18.1.tar
 */
export function getSsriFromFile(filePath: string): Promise<string> {
  return new Promise((resolve) => {
    const $integrity = ssri.integrityStream();
    const $read = fs.createReadStream(filePath);

    $integrity.on('data', () => {
      /* subscribe so stream runs */
    });
    $integrity.on('integrity', (result) => {
      log.verbose(`finished getting integrity hash of ${filePath}`);
      const integrity = ssri.parse(result.sha512[0]).toString();
      resolve(integrity);
    });

    $read.on('error', (err) => {
      log.error(
        `error reading ${filePath}\n  delete this file and run shrinkpack again`,
        err,
      );
      process.exit(1);
    });

    $read.pipe($integrity);
  });
}
