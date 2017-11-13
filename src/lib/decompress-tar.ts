import { createReadStream, createWriteStream } from './fs';
import { bug } from './log';
import rateLimit from './rate-limit';
const gunzipMaybe = require('gunzip-maybe');
const when = require('when');

const onError = (message: string) => (err: Error) => {
  bug(message, err);
};

export default rateLimit((sourcePath: string, targetPath: string) =>
  when.promise((resolve: () => void) => {
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
