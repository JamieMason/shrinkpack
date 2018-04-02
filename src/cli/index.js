// 3rd party modules
var chalk = require('chalk');
var fromNpm = require('libprecious/lib/config/npm-config.js').fromNpm;
var MyPrecious = require('libprecious');
var npmlog = require('npmlog');

// modules
var getTimeBetween = require('../lib/get-time-between');

// public
module.exports = {
  run: runCli
};

// implementation
function runCli() {
  var startTime = new Date();
  return fromNpm(process.argv)
    .then(createInstance)
    .then(archive)
    .then(displaySummary)
    .catch(displayFailure);

  function createInstance(config) {
    npmlog.level = config.get('loglevel');
    return new MyPrecious({ config, log: npmlog });
  }

  function archive(precious) {
    return precious.archive();
  }

  function displaySummary(details) {
    console.info(
      [
        'shrinkpack',
        chalk.green('+' + details.pkgCount),
        chalk.red('-' + details.removed),
        chalk.grey(getTimeBetween(startTime, new Date()))
      ].join(' ')
    );
  }

  function displayFailure(err) {
    console.error(
      chalk.red('! Please raise an issue at %s\n\n%s'),
      chalk.underline('https://github.com/JamieMason/shrinkpack/issues')
    );
    npmlog.error('', err.message);
    npmlog.verbose('', err.stack);
  }
}
