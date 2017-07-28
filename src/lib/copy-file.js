import chalk from 'chalk';
import fs from 'graceful-fs';
import gunzipMaybe from 'gunzip-maybe';
import when from 'when';
import rateLimit from './rate-limit';

export default rateLimit(copyFile);

function copyFile(source, target) {
  return when.promise((resolve, reject) => {
    let gunzip$;
    const read$ = fs.createReadStream(source);
    const write$ = fs.createWriteStream(target);

    read$.on('error', onReadError);
    write$.on('error', onWriteError);
    write$.on('finish', onWriteEnd);

    if (isCompressed()) {
      read$.pipe(write$);
    } else {
      gunzip$ = gunzipMaybe();
      gunzip$.on('error', onGunzipError);
      read$.pipe(gunzip$).pipe(write$);
    }

    function onReadError(err) {
      console.error(chalk.red('! failed to read file %s'), source);
      reject(err);
    }

    function onGunzipError(err) {
      console.error(chalk.red('! failed to decompress file %s'), source);
      reject(err);
    }

    function onWriteError(err) {
      console.error(chalk.red('! failed to write file %s'), target);
      reject(err);
    }

    function onWriteEnd() {
      resolve();
    }

    function isCompressed() {
      return target.search(/\.tar$/) === -1;
    }
  });
}
