#!/usr/bin/env node

// 3rd party modules
var path = require('path');
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

program.parse(process.argv);

if (directoryValue) {
  cli.run(path.resolve(directoryValue));
} else {
  cli.run(process.cwd());
}
