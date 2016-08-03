// 3rd party modules
var chalk = require('chalk');

// modules
var getTimeBetween = require('../lib/get-time-between');

// public
module.exports = displaySummary;

// implementation
function displaySummary(config) {
  console.info([
    'shrinkpack',
    chalk.green('+' + config.stats.unbundled.total),
    chalk.red('-' + config.stats.bundled.unused),
    chalk.yellow('↓' + config.stats.unbundled.uncached),
    chalk.magenta('→' + config.stats.unbundled.cached),
    chalk.green('✓' + config.stats.unbundled.unresolved),
    chalk.grey(getTimeBetween(config.startTime, new Date()))
  ].join(' '));
}
