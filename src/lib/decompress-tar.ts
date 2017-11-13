import { createReadStream, createWriteStream } from './fs';
import { bug } from './log';
import { rateLimit } from './rate-limit';

const gunzipMaybe = require('gunzip-maybe');
const when = require('when');

export const decompressTar = rateLimit<string>((sourcePath: string, targetPath: string) =>
  when.promise((resolve: () => void) => {
    const onError = (message: string) => (err: Error) => bug(message, err);
    const gunzip$ = gunzipMaybe();
    const read$ = createReadStream(sourcePath);
    const write$ = createWriteStream(targetPath);
    gunzip$.on('error', onError(`failed to decompress ${sourcePath}`));
    read$.on('error', onError(`failed to read ${sourcePath}`));
    write$.on('error', onError(`failed to write ${targetPath}`));
    write$.on('finish', resolve);
    read$.pipe(gunzip$).pipe(write$);
  })
);
