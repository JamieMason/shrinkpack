// node modules
var childProcess = require('child_process');
var path = require('path');

// 3rd party modules
var when = require('when');

// public
module.exports = readNpmCache;

// implementation
function readNpmCache () {
  return getCacheContents()
    .then(toArray)
    .then(getPackages)
    .then(indexPathsByVersion);

  function getCacheContents () {
    var allData = '';
    var deferred = when.defer();
    var npmCache = childProcess.spawn('npm', ['cache', 'ls']);

    npmCache.stdout.setEncoding('utf8');
    npmCache.stdout.on('data', onData);
    npmCache.on('close', onClose);

    return deferred.promise;

    function onData (data) {
      allData += data;
    }

    function onClose (code) {
      if (code === 1) {
        deferred.reject(new Error('! failed to read contents of npm cache'));
      } else {
        deferred.resolve(allData);
      }
    }
  }

  function toArray (stdout) {
    return stdout.trim().split('\n');
  }

  function getPackages (cacheContents) {
    return cacheContents.filter(isPackage);
  }

  function isPackage (location) {
    return location.indexOf('package.tgz') !== -1;
  }

  function indexPathsByVersion (packages) {
    return packages.reduce(addPackageToIndex, {});
  }

  function addPackageToIndex (index, location) {
    var parts = location.split(path.sep);
    var name = parts[parts.length - 3];
    var version = parts[parts.length - 2];
    index[name + '@' + version] = path.resolve(location);
    return index;
  }
}
