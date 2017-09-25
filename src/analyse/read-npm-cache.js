// Node modules
var os = require('os');
var path = require('path');

// 3rd party modules
var when = require('when');

// Modules
var childProcess = require('../lib/child-process');

// Public
module.exports = readNpmCache;

// Implementation
function readNpmCache() {
  var home = os.homedir();

  return getCacheContents()
    .then(toArray)
    .then(getPackages)
    .then(indexByPath);

  function getCacheContents() {
    var allData = '';
    var deferred = when.defer();
    var npmCache = childProcess.spawn('npm', ['cache', 'ls']);

    npmCache.stdout.setEncoding('utf8');
    npmCache.stdout.on('data', onData);
    npmCache.on('close', onClose);

    return deferred.promise;

    function onData(data) {
      allData += data;
    }

    function onClose(code) {
      if (code === 1) {
        deferred.reject(new Error('! failed to read contents of npm cache'));
      } else {
        deferred.resolve(allData);
      }
    }
  }

  function toArray(stdout) {
    return stdout.split(os.EOL);
  }

  function getPackages(cacheContents) {
    return cacheContents.filter(isPackage);
  }

  function isPackage(location) {
    return location.indexOf('package.tgz') !== -1;
  }

  function indexByPath(packages) {
    return packages.reduce(function (memo, location) {
      memo[path.resolve(expandTilde(location))] = true;
      return memo;
    }, {});
  }

  function expandTilde(location) {
    if (home) {
      return location.replace(/^~($|\/|\\)/, home + '$1');
    }
    return location;
  }
}
