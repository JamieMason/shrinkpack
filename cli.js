#!/usr/bin/env node

// 3rd party modules
var chalk = require('chalk');
var program = require('commander');

// modules
var cli = require('./src/cli');
var version = require('./package.json').version;

// implementation
program.version(version);

program.on('--help', onHelp);
program.parse(process.argv);

cli.run();

function onHelp() {
  console.log('  Icons:');
  console.log('');
  console.log('    ' + chalk.green('+') + ' Added');
  console.log('    ' + chalk.red('-') + ' Removed');
  console.log('    ' + chalk.grey('12:34') + ' Time Taken');
  console.log('');
  console.log('  Compression:');
  console.log('');
  console.log('    Although compressed .tgz files have lower filesizes, storing binary files in');
  console.log('    Git can result in a gradual increase in the time it takes to push to your');
  console.log('    repository. Shrinkpack uses uncompressed, plain text .tar files, which are');
  console.log('    handled optimally by Git in the same way that .md, .js, and .css files are.');
}
