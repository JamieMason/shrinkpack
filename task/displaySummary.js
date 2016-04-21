// 3rd party modules
var chalk = require('chalk');

// modules
var getTimeBetween = require('./lib/getTimeBetween');

// public
module.exports = displaySummary;

// implementation
function displaySummary (config) {
  console.info([
    'shrinkpack',
    chalk.green('+' + config.deps.missingFromBundle.length),
    chalk.red('-' + config.deps.removeFromBundle.length),
    chalk.yellow('↓' + config.deps.missingFromCache.length),
    chalk.green('✓' + config.deps.missingAndUnresolved.length),
    chalk.grey(getTimeBetween(config.startTime, new Date()))
  ].join(' '));
  process.exit(0);
}
