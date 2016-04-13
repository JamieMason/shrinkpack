// 3rd party modules
var chalk = require('chalk');

// public
module.exports = displaySummary;

// implementation
function displaySummary (config) {
  console.info(
    'shrinkpack %s %s %s %s',
    chalk.green('+' + config.deps.missingFromBundle.length),
    chalk.red('-' + config.deps.removeFromBundle.length),
    chalk.yellow('↓' + config.deps.missingFromCache.length),
    chalk.green('✓' + config.deps.unresolved.length)
  );
  process.exit(0);
}
