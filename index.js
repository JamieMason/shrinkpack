#!/usr/bin/env node

'use strict';

// 3rd party modules

var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var when = require('when');

// modules

var exec = require('./src/exec');
var file = require('./src/file');
var npmCache = require('./src/npmCache');
var shrinkpack = require('./src/shrinkpack');
var shrinkwrap = require('./src/shrinkwrap');

// run

getNpmCachePath()
  .then(getConfig)
  .then(createDirectory)
  .then(getDeps)
  .then(prune)
  .then(getMissingDeps)
  .then(addMissingDeps)
  .then(updateShrinkwrap)
  .then(displaySummary, displayFailure);

// implementation

function getNpmCachePath () {
  return exec('npm config get cache');
}

function getConfig (npmCachePath) {
  var projectPath = process.env.PWD || process.cwd();
  var graphPath = path.join(projectPath, 'npm-shrinkwrap.json');
  var graph = require(graphPath);
  var shrinkpackPath = path.join(projectPath, 'node_shrinkwrap');

  return {
    deps: [],
    graph: graph,
    missingDeps: [],
    prunedPaths: [],
    path: {
      project: projectPath,
      graph: graphPath,
      shrinkpack: shrinkpackPath,
      npmCache: npmCachePath
    }
  };
}

function createDirectory (config) {
  if (!fs.existsSync(config.path.shrinkpack)) {
    fs.mkdirSync(config.path.shrinkpack);
  }
  return config;
}

function getDeps (config) {
  config.deps = shrinkwrap.toArray(config);
  return config;
}

function prune (config) {
  return shrinkpack.prune(config)
    .then(function (prunedPaths) {
      config.prunedPaths = prunedPaths;
      return config;
    }, function (err) {
      console.error(err);
      return err;
    }, function (msg) {
      console.info(chalk.red(msg));
      return msg;
    });
}

function getMissingDeps (config) {
  config.missingDeps = shrinkpack.getMissingPackages(config);
  return config;
}

function addMissingDeps (config) {
  return when.all(
    config.missingDeps.map(addMissingDep)
  ).then(function () {
    return config;
  });

  function addMissingDep (dep) {
    return when(dep)
      .then(addToNpmCache)
      .then(addToShrinkpack);
  }

  function addToNpmCache (dep) {
    return npmCache.ensure(dep)
      .then(function () {
        return dep;
      }, function (err) {
        console.error(err);
        return err;
      }, function (msg) {
        return msg;
      });
  }

  function addToShrinkpack (dep) {
    return shrinkpack.addPackage(dep)
      .then(function () {
        return dep;
      }, function (err) {
        console.error(err);
        return err;
      }, function (msg) {
        console.info(chalk.green(msg));
        return msg;
      });
  }
}

function updateShrinkwrap (config) {
  rewritePaths();

  return file.write(config.path.graph, JSON.stringify(config.graph, null, 2))
    .then(function () {
      return config;
    }, function (err) {
      return err;
    }, function (msg) {
      return msg;
    });

  function rewritePaths () {
    shrinkwrap.recurse(config.graph, rewritePath);
  }

  function rewritePath (key, object) {
    object.resolved = './node_shrinkwrap/' + shrinkwrap.getTarballName(key, object.version);
  }
}

function displaySummary (config) {
  console.info(
    'shrinkpack %s %s',
    chalk.green('+' + config.missingDeps.length),
    chalk.red('-' + config.prunedPaths.length)
  );
  process.exit(0);
}

function displayFailure (err) {
  console.error(
    chalk.red('Please raise an issue at %s\n\n%s'),
    chalk.underline('https://github.com/JamieMason/shrinkpack/issues'),
    String(err.stack).replace(/^/gm, '    ')
  );
  process.exit(1);
}
