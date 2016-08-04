#!/usr/bin/env node

// node modules
var path = require('path');

// 3rd party modules
var chalk = require('chalk');
var program = require('commander');

// modules
var cli = require('./src/cli');
var version = require('./package.json').version;

// implementation
var directoryValue = process.cwd();

program
  .version(version)
  .option('-c, --compress', 'use compressed .tgz tarballs instead of .tar')
  .arguments('[directory]')
  .action(function (directory) {
    directoryValue = path.resolve(directory);
  });

program.on('--help', onHelp);
program.parse(process.argv);

cli.run({
  compress: program.compress === true,
  directory: directoryValue
});

function onHelp() {
  console.log('  Icons:');
  console.log('');
  logIcon(chalk.green, '+', 'Added');
  logIcon(chalk.yellow, '↓', 'Downloaded');
  logIcon(chalk.magenta, '→', 'Imported from Cache');
  logIcon(chalk.blue, 'i', 'Information');
  logIcon(chalk.red, '-', 'Removed');
  logIcon(chalk.green, '✓', 'Resolved');
  logIcon(chalk.grey, '12:34', 'Time Taken');
  console.log('');
  console.log('  Compression:');
  console.log('');
  console.log('    Although compressed .tgz files have lower filesizes, storing binary files in');
  console.log('    Git can result in a gradual increase in the time it takes to push to your');
  console.log('    repository. Shrinkpack uses uncompressed, plain text .tar files by default,');
  console.log('    which are handled optimally by Git in the same way that .md, .js, and .css');
  console.log('    files are for example.');

  function logIcon(colour, icon, label) {
    console.log('    ' + colour(icon) + ' ' + label);
  }
}
