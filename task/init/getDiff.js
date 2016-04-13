// 3rd party modules
var fs = require('graceful-fs');
var path = require('path');
var uniq = require('lodash.uniq');

// public
module.exports = getDiff;

// implementation
function getDiff (pathToBundle, deps, npmCache) {
  var uniqueDeps = uniq(deps, getId);
  var requiredTars = uniqueDeps.map(getTarballPath);
  var bundledTars = fs.readdirSync(pathToBundle).map(getAbsolutePath);
  var missingFromBundle = uniqueDeps.filter(isNotInBundle);
  var missingFromCache = missingFromBundle.filter(isNotInCache);
  var removeFromBundle = bundledTars.filter(isNotInShrinkwrap);

  return {
    missingFromBundle: uniq(missingFromBundle, getId),
    missingFromCache: uniq(missingFromCache, getId),
    removeFromBundle: uniq(removeFromBundle, getId)
  };

  function getAbsolutePath (filename) {
    return path.join(pathToBundle, filename);
  }

  function getTarballPath (dep) {
    return dep.tarball.shrinkpack;
  }

  function isNotInBundle (dep) {
    return bundledTars.indexOf(dep.tarball.shrinkpack) === -1;
  }

  function isNotInCache (dep) {
    return typeof npmCache[dep.id] === 'undefined';
  }

  function isNotInShrinkwrap (tar) {
    return requiredTars.indexOf(tar) === -1;
  }

  function getId (dep) {
    return dep.id;
  }
}
