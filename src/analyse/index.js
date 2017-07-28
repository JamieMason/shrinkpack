import assign from 'lodash.assign';
import when from 'when';
import createBundleDirectory from './create-bundle-directory';
import getDependencies from './get-dependencies';
import getGraph from './get-graph';
import getPaths from './get-paths';
import getStats from './get-stats';
import getUnusedDependencies from './get-unused-dependencies';
import pruneOptionalDependencies from './prune-optional-dependencies';
import readBundle from './read-bundle';
import readNpmCache from './read-npm-cache';

export default init;

function init(options) {
  return when({ options, startTime: new Date() })
    .then(getConfigWithPaths)
    .then(getConfigWithGraph)
    .then(handleOptionalDependencies)
    .then(ensureBundleExists)
    .then(getConfigWithNpmCacheContents)
    .then(getConfigWithBundleContents)
    .then(getConfigWithDependencies)
    .then(getConfigWithUnusedDependencies)
    .then(getConfigWithStats);

  function getConfigWithPaths(config) {
    return getPaths(config.options.directory).then(paths =>
      assign(config, { path: paths })
    );
  }

  function getConfigWithGraph(config) {
    return getGraph(config.path.graph).then(graph => assign(config, { graph }));
  }

  function handleOptionalDependencies(config) {
    return pruneOptionalDependencies(config).then(graph =>
      assign(config, { graph })
    );
  }

  function ensureBundleExists(config) {
    return createBundleDirectory(config.path.shrinkpack).then(() => config);
  }

  function getConfigWithNpmCacheContents(config) {
    return readNpmCache(config.path.npmCache).then(npmCache =>
      assign(config, { npmCache })
    );
  }

  function getConfigWithBundleContents(config) {
    return readBundle(config.path.shrinkpack).then(bundle =>
      assign(config, { bundle })
    );
  }

  function getConfigWithDependencies(config) {
    return getDependencies(config).then(deps => assign(config, { deps }));
  }

  function getConfigWithUnusedDependencies(config) {
    return getUnusedDependencies(config).then(unusedDependencies =>
      assign(config, { unusedDependencies })
    );
  }

  function getConfigWithStats(config) {
    return getStats(config).then(stats => assign(config, { stats }));
  }
}
