import color from 'picocolors';

export const log = {
  deletion(msg: string): void {
    console.log(color.red('-'), msg);
  },
  download(msg: string): void {
    console.log(color.yellow('↓'), msg);
  },
  error(msg: string, err?: unknown): void {
    console.error(color.red(`! ${msg}`));
    if (isError(err)) {
      console.error(color.dim(err.stack || ''));
    }
  },
  info(msg: string): void {
    console.log(color.blue(`i ${msg}`));
  },
  verbose(msg: string): void {
    if (process.env.SHRINKPACK_LOG_LEVEL === 'verbose') {
      console.error(color.gray(`# ${msg}`));
    }
  },
};

function isError(value: unknown): value is Error {
  return Boolean(value && typeof value === 'object' && 'stack' in value);
}
