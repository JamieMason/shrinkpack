import chalk from 'chalk';

const isVerbose = process.env.NODE_ENV === 'development';

export const addition = (value: string): void => console.log(chalk.green('+ %s'), value);
export const bug = (value: string, err: Error): void =>
  console.log(
    chalk.red('! %s\n\n! Please raise an issue at %s\n\n%s'),
    value,
    chalk.underline('https://github.com/JamieMason/shrinkpack/issues'),
    String(err.stack).replace(/^/gm, '    ')
  );
export const error = (value: string, err: Error): void => console.log(chalk.red('! %s\n\n%s'), value, err);
export const info = (value: string): void => console.log(chalk.blue('i %s'), value);
export const removal = (value: string): void => console.log(chalk.red('- %s'), value);
export const verbose = (value: string): void => isVerbose && console.log(chalk.grey('? %s'), value);
