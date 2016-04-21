// 3rd party modules
var chalk = require('chalk');
var childProcess = require('child_process');
var fs = require('graceful-fs');
var path = require('path');

// modules
var getDiff = require('./getDiff');
var readGraph = require('./readGraph');

// public
module.exports = init;

// implementation
function init () {
  var pwd = process.env.PWD || process.cwd();
  var graphPath = path.join(pwd, 'npm-shrinkwrap.json');
  var graph = getGraph(graphPath);
  var pathToBundle = createDirectory(pwd);
  var npmCachePath = getNpmCachePath();
  var npmCache = readNpmCache();
  var deps = readGraph(graph, pathToBundle, npmCachePath);
  var diff = getDiff(pathToBundle, deps, npmCache);

  return {
    deps: {
      all: deps,
      missingFromBundle: diff.missingFromBundle,
      missingFromCache: diff.missingFromCache,
      removeFromBundle: diff.removeFromBundle,
      unresolved: deps.filter(isUnresolved)
    },
    graph: graph,
    npmCache: npmCache,
    path: {
      graph: graphPath,
      npmCache: npmCachePath,
      project: pwd,
      shrinkpack: pathToBundle
    },
    startTime: new Date()
  };
}

function getGraph (graphPath) {
  if (!fs.existsSync(graphPath)) {
    console.error(chalk.red('! npm-shrinkwrap.json is missing, create it using `npm shrinkwrap --dev` then try again'));
    process.exit(1);
  }
  var source = fs.readFileSync(graphPath, 'utf8');
  if (source.indexOf('node_shrinkwrap/') !== -1) {
    console.warn(chalk.yellow('! npm-shrinkwrap.json is already shrinkpacked, you may want to update it using `npm shrinkwrap --dev` before shrinkpacking'));
  }
  return JSON.parse(source);
}

function createDirectory (pwd) {
  var pathToBundle = path.join(pwd, 'node_shrinkwrap');
  if (!fs.existsSync(pathToBundle)) {
    fs.mkdirSync(pathToBundle);
  }
  return pathToBundle;
}

function isUnresolved (dep) {
  return !dep.shrinkwrap.resolved;
}

function getNpmCachePath () {
  return childProcess.execSync('npm config get cache', {
    encoding: 'utf8'
  }).trim();
}

function readNpmCache () {
  // example: ~/.npm/when/3.7.7/package.tgz
  return childProcess.execSync('npm cache ls', { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(function (record) {
      return record.indexOf('package.tgz') !== -1;
    })
    .reduce(function (index, record) {
      var parts = record.split(path.sep);
      var name = parts[parts.length - 3];
      var version = parts[parts.length - 2];
      index[name + '@' + version] = path.resolve(record);
      return index;
    }, {});
}
