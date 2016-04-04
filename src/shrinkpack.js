'use strict';

// 3rd party modules

var fs = require('fs');
var path = require('path');
var when = require('when');

// modules

var file = require('./file');

// public

module.exports = {
  addPackage: addPackage,
  getMissingPackages: getMissingPackages,
  prune: prune
};

// implementation

function addPackage (dep) {
  return file.copy(dep.tarball.npm, dep.tarball.shrinkpack)
    .then(onWrite, onError, onNotify);

  function onWrite () {
    return dep;
  }

  function onError (err) {
    return err;
  }

  function onNotify () {
    return '+ ' + dep.id;
  }
}

function getMissingPackages (options) {
  var diff = getDiff(options);
  return options.deps.filter(needsAdding);

  function needsAdding (dep) {
    return diff.additions.indexOf(dep.tarball.shrinkpack) !== -1;
  }
}

function prune (options) {
  var removals = getDiff(options).removals;
  return when.all(removals.map(removeFile))
    .then(onComplete, onError);

  function onComplete () {
    return removals;
  }

  function onError (err) {
    return err;
  }

  function removeFile (source) {
    return file.remove(source)
      .then(null, null, onNotify);
  }

  function onNotify (source) {
    var filename = source.slice(source.lastIndexOf('/') + 1, source.lastIndexOf('.'));
    return '- ' + filename.replace('-', '@');
  }
}

function getDiff (options) {
  var packedDeps = getContents(options.path.project);
  var requiredDeps = options.deps.map(getTarballPath);

  return {
    additions: requiredDeps.filter(needsAdding),
    removals: packedDeps.filter(needsRemoving)
  };

  function getTarballPath (dep) {
    return dep.tarball.shrinkpack;
  }

  function needsAdding (requiredDep) {
    return packedDeps.indexOf(requiredDep) === -1;
  }

  function needsRemoving (packedDep) {
    return requiredDeps.indexOf(packedDep) === -1;
  }

  function getContents () {
    return fs.readdirSync(options.path.shrinkpack).map(getAbsolutePath);
  }

  function getAbsolutePath (filename) {
    return path.join(options.path.shrinkpack, filename);
  }
}
