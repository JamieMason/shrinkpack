import gunzipMaybe from 'gunzip-maybe';
import when from 'when';
import * as fs from './fs';
import * as log from './log';
import rateLimit from './rate-limit';

const onError = message => err => {
  log.bug(message, err);
  process.exit(1);
};

export default rateLimit((sourcePath, targetPath) =>
  when.promise(resolve => {
    const gunzip$ = gunzipMaybe();
    const read$ = fs.createReadStream(sourcePath);
    const write$ = fs.createWriteStream(targetPath);
    gunzip$.on('error', onError(`failed to decompress ${sourcePath}`));
    read$.on('error', onError(`failed to read ${sourcePath}`));
    write$.on('error', onError(`failed to write ${targetPath}`));
    write$.on('finish', resolve);
    read$.pipe(gunzip$).pipe(write$);
  })
);
