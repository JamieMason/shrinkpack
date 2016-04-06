'use strict';

// 3rd party modules

var exec = require('./exec');
var guard = require('when/guard');
var when = require('when');

// public

module.exports = {
  ensure: guard(guard.n(10), downloadTarball)
};

// implementation

function downloadTarball (dep) {
  return ensurePackageIsResolved(dep)
    .then(ensurePackageIsCached);
}

function ensurePackageIsResolved (dep) {
  return dep.resolved ? when.resolve(dep) : resolveTarball(dep);
}

function ensurePackageIsCached (dep) {
  return isCached(dep)
    .then(function onCacheCheck (inCache) {
      return inCache ? dep : addToCache(dep)
        .then(function onCached () {
          return dep;
        });
    });
}

function resolveTarball (dep) {
  return exec('npm view ' + dep.id + ' --json')
    .then(function onComplete (stdout) {
      dep.resolved = JSON.parse(stdout).dist.tarball;
      return dep;
    }, function onError (err) {
      throw new Error('error resolving missing tarball url in ' + dep.id + ': ' + String(err));
    });
}

function isCached (dep) {
  return exec('npm cache ls ' + dep.id)
    .then(function onComplete (stdout) {
      return stdout.indexOf('package.json') !== -1;
    }, function onError (err) {
      throw new Error('error checking if ' + dep.id + ' is already in npm cache: ' + String(err));
    });
}

function addToCache (dep) {
  return exec('npm cache add ' + dep.shrinkwrap.resolved)
    .then(function onComplete () {
      return dep;
    }, function onError (err) {
      throw new Error('error checking if ' + dep.id + ' is already in npm cache: ' + String(err));
    });
}
