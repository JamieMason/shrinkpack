// 3rd party modules
var when = require('when');

// public
module.exports = getStats;

// implementation
function getStats(config) {
  var bundled = Object.keys(config.bundle);
  var unused = Object.keys(config.unusedDependencies);
  var unbundled = config.deps.filter(isNotBundled);
  var uncached = unbundled.filter(isNotCached);
  var unresolved = unbundled.filter(isNotResolved);
  var cached = unbundled.length - uncached.length;

  return when({
    bundled: {
      used: bundled.length,
      unused: unused.length
    },
    total: config.deps.length,
    unbundled: {
      cached: cached,
      total: unbundled.length,
      uncached: uncached.length,
      unresolved: unresolved.length
    }
  });

  function isNotBundled(dependency) {
    return !dependency.isBundled();
  }

  function isNotCached(dependency) {
    return !dependency.isCached();
  }

  function isNotResolved(dependency) {
    return !dependency.isResolved();
  }
}
