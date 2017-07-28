import when from 'when';

export default getStats;

function getStats(config) {
  const bundled = Object.keys(config.bundle);
  const unused = Object.keys(config.unusedDependencies);
  const unbundled = config.deps.filter(isNotBundled);
  const uncached = unbundled.filter(isNotCached);
  const unresolved = unbundled.filter(isNotResolved);
  const cached = unbundled.length - uncached.length;

  return when({
    bundled: {
      used: bundled.length,
      unused: unused.length
    },
    total: config.deps.length,
    unbundled: {
      cached,
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
