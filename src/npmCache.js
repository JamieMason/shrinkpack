'use strict';

// 3rd party modules

var exec = require('./exec');
var guard = require('when/guard');

// public

module.exports = {
  ensure: guard(guard.n(10), ensurePackageIsCached)
};

// implementation

function ensurePackageIsCached (dep) {
  return isCached(dep)
    .then(function onCacheCheck (inCache) {
      return inCache ? dep : addToCache(dep)
        .then(function onCached () {
          return dep;
        });
    });
}

function isCached (dep) {
  return exec('npm cache ls ' + dep.id)
    .then(function onComplete (stdout) {
      return stdout.indexOf('package.json') !== -1;
    }, function onError (err) {
      throw new Error('error checking if ' + dep.id + ' is already in npm cache: ' + err.toString());
    });
}

function addToCache (dep) {
  return exec('npm cache add ' + dep.shrinkwrap.resolved)
    .then(function onComplete () {
      return dep;
    }, function onError (err) {
      throw new Error('error checking if ' + dep.id + ' is already in npm cache: ' + err.toString());
    });
}
