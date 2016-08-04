// 3rd party modules
var assign = require('lodash.assign');
var when = require('when');

// modules
var createBundleDirectory = require('./create-bundle-directory');
var getDependencies = require('./get-dependencies');
var getGraph = require('./get-graph');
var getPaths = require('./get-paths');
var getStats = require('./get-stats');
var getUnusedDependencies = require('./get-unused-dependencies');
var readBundle = require('./read-bundle');
var readNpmCache = require('./read-npm-cache');

// public
module.exports = init;

// implementation
function init(directory) {
  return when({startTime: new Date()})
    .then(getConfigWithPaths)
    .then(getConfigWithGraph)
    .then(ensureBundleExists)
    .then(getConfigWithNpmCacheContents)
    .then(getConfigWithBundleContents)
    .then(getConfigWithDependencies)
    .then(getConfigWithUnusedDependencies)
    .then(getConfigWithStats);

  function getConfigWithPaths(config) {
    return getPaths(directory)
      .then(function (paths) {
        return assign(config, {path: paths});
      });
  }

  function getConfigWithGraph(config) {
    return getGraph(config.path.graph)
      .then(function (graph) {
        return assign(config, {graph: graph});
      });
  }

  function ensureBundleExists(config) {
    return createBundleDirectory(config.path.shrinkpack)
      .then(function () {
        return config;
      });
  }

  function getConfigWithNpmCacheContents(config) {
    return readNpmCache(config.path.npmCache)
      .then(function (npmCache) {
        return assign(config, {npmCache: npmCache});
      });
  }

  function getConfigWithBundleContents(config) {
    return readBundle(config.path.shrinkpack)
      .then(function (bundle) {
        return assign(config, {bundle: bundle});
      });
  }

  function getConfigWithDependencies(config) {
    return getDependencies(config)
      .then(function (deps) {
        return assign(config, {deps: deps});
      });
  }

  function getConfigWithUnusedDependencies(config) {
    return getUnusedDependencies(config)
      .then(function (unusedDependencies) {
        return assign(config, {unusedDependencies: unusedDependencies});
      });
  }

  function getConfigWithStats(config) {
    return getStats(config)
      .then(function (stats) {
        return assign(config, {stats: stats});
      });
  }
}
