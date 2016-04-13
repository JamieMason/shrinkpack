// 3rd party modules
var chalk = require('chalk');

// public
module.exports = describeChanges;

// implementation
function describeChanges (config) {
  var totalDeps = config.deps.all.length;
  var totalUnresolved = config.deps.unresolved.length;
  var totalAdd = config.deps.missingFromBundle.length;
  var totalUncached = config.deps.missingFromCache.length;
  var totalRemove = config.deps.removeFromBundle.length;
  var totalCached = totalAdd - totalUncached;

  console.info(chalk.blue('i %s dependencies in npm-shrinkwrap.json'), totalDeps);
  console.info(chalk.blue('i %s have a missing "resolved" property'), totalUnresolved);
  console.info(chalk.blue('i %s need removing from ./node_shrinkwrap'), totalRemove);
  console.info(chalk.blue('i %s need adding to ./node_shrinkwrap'), totalAdd);
  console.info(chalk.blue('i %s are in your npm cache'), totalCached);
  console.info(chalk.blue('i %s need downloading'), totalUncached);
  return Promise.resolve();
}
