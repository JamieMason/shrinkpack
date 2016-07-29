// 3rd party modules
var when = require('when');

// modules
var getDiff = require('./getDiff');
var readGraph = require('./readGraph');

// public
module.exports = getDeps;

// implementation
function getDeps (config) {
  var deps = readGraph(config.graph, config.path.shrinkpack, config.path.npmCache);
  var diff = getDiff(config.path.shrinkpack, deps, config.npmCache);
  var unresolved = deps.filter(isUnresolved);

  return when({
    all: deps,
    missingAndUnresolved: unresolved.filter(needsResolving),
    missingFromBundle: diff.missingFromBundle,
    missingFromCache: diff.missingFromCache,
    removeFromBundle: diff.removeFromBundle,
    unresolved: unresolved
  });

  function needsResolving (dep) {
    return diff.missingFromBundle.indexOf(dep) !== -1 && diff.missingFromCache.indexOf(dep) !== -1;
  }

  function isUnresolved (dep) {
    return !dep.shrinkwrap.resolved;
  }
}
