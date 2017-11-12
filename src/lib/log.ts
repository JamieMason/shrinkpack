import chalk from 'chalk';

const isVerbose = process.env.NODE_ENV === 'development';

export const addition = (value: string) => console.info(chalk.green('+ %s'), value);
export const bug = (value: string, err: Error) =>
  console.error(
    chalk.red('! %s\n\n! Please raise an issue at %s\n\n%s'),
    value,
    chalk.underline('https://github.com/JamieMason/shrinkpack/issues'),
    String(err.stack).replace(/^/gm, '    ')
  );
export const error = (value: string, err: Error) => console.error(chalk.red('! %s\n\n%s'), value, err);
export const info = (value: string) => console.info(chalk.blue('i %s'), value);
export const removal = (value: string) => console.info(chalk.red('- %s'), value);
export const verbose = (value: string) => isVerbose && console.info(chalk.grey('? %s'), value);
