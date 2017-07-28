import chalk from 'chalk';
import getTimeBetween from '../lib/get-time-between';

export default displaySummary;

function displaySummary(config) {
  console.info(
    [
      'shrinkpack',
      chalk.green(`+${config.stats.unbundled.total}`),
      chalk.red(`-${config.stats.bundled.unused}`),
      chalk.yellow(`↓${config.stats.unbundled.uncached}`),
      chalk.magenta(`→${config.stats.unbundled.cached}`),
      chalk.green(`✓${config.stats.unbundled.unresolved}`),
      chalk.grey(getTimeBetween(config.startTime, new Date()))
    ].join(' ')
  );
}
