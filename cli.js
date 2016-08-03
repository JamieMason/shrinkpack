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
var directoryValue;

program
  .version(version)
  .arguments('[directory]')
  .action(function (directory) {
    directoryValue = directory;
  });

program.on('--help', onHelp);

program.parse(process.argv);

if (directoryValue) {
  cli.run(path.resolve(directoryValue));
} else {
  cli.run(process.cwd());
}

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

  function logIcon(colour, icon, label) {
    console.log('    ' + colour(icon) + ' ' + label);
  }
}
