#!/usr/bin/env node

import color from 'picocolors';
import { program } from 'commander';
import path from 'path';
import { shrinkpack } from '.';

let directoryValue = process.cwd();

program
  .version(require('../package.json').version)
  .arguments('[directory]')
  .action((directory: string) => {
    if (directory) {
      directoryValue = path.resolve(directory);
    }
  })
  .on('--help', () => {
    console.log('');
    console.log('Icons:');
    console.log(`  ${color.green('+')} Added`);
    console.log(`  ${color.red('-')} Removed`);
    console.log(`  ${color.blue('i')} Information`);
    console.log(`  ${color.gray('12:34')} Time Taken`);
  })
  .parse(process.argv);

shrinkpack({
  directory: directoryValue,
});
