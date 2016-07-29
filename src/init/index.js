// 3rd party modules
var assign = require('lodash.assign');
var when = require('when');

// modules
var createBundleDirectory = require('./createBundleDirectory');
var getDeps = require('./getDeps');
var getGraph = require('./getGraph');
var getPaths = require('./getPaths');
var readNpmCache = require('./readNpmCache');

// public
module.exports = init;

// implementation
function init (directory) {
  return when({ startTime: new Date() })
    .then(getConfigWithPath)
    .then(getConfigWithGraph)
    .then(ensureBundleExists)
    .then(getConfigWithNpmCache)
    .then(getConfigWithDeps);

  function getConfigWithPath (config) {
    return getPaths(directory)
      .then(function (paths) {
        return assign(config, { path: paths });
      });
  }

  function getConfigWithGraph (config) {
    return getGraph(config.path.graph)
      .then(function (graph) {
        return assign(config, { graph: graph });
      });
  }

  function ensureBundleExists (config) {
    return createBundleDirectory(config.path.shrinkpack)
      .then(function () {
        return config;
      });
  }

  function getConfigWithNpmCache (config) {
    return readNpmCache(config.path.npmCache)
      .then(function (npmCache) {
        return assign(config, { npmCache: npmCache });
      });
  }

  function getConfigWithDeps (config) {
    return getDeps(config)
      .then(function (deps) {
        return assign(config, { deps: deps });
      });
  }
}
