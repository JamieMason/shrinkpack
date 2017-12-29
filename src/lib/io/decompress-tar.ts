import { createReadStream, createWriteStream } from 'fs-extra';
import { bug } from '../log';

const gunzipMaybe = require('gunzip-maybe');

export const decompressTar = (sourcePath: string, targetPath: string) =>
  new Promise((resolve) => {
    const onError = (message: string) => (err: Error) => bug(message, err);
    const gunzip$ = gunzipMaybe();
    const read$ = createReadStream(sourcePath);
    const write$ = createWriteStream(targetPath);
    gunzip$.on('error', onError(`failed to decompress ${sourcePath}`));
    read$.on('error', onError(`failed to read ${sourcePath}`));
    write$.on('error', onError(`failed to write ${targetPath}`));
    write$.on('finish', resolve);
    read$.pipe(gunzip$).pipe(write$);
  });
