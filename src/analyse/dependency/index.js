// Node modules
var path = require('path');

// 3rd party modules
var chalk = require('chalk');
var when = require('when');

// Modules
var bundle = require('./bundle');
var cache = require('./cache');
var resolve = require('./resolve');

// Public
module.exports = Dependency;

// Implementation
function Dependency(name, graph) {
  this.graph = graph;
  this.name = name;
}

// Statics
Dependency.setConfig = function (config) {
  Dependency.prototype.config = config;
};

// Shared
Dependency.prototype = {
  bundle: function () {
    if (!this.isBundled()) {
      return bundle(this).then(function (dependency) {
        console.info(chalk.green('+ %s'), dependency.getBundleName());
        return dependency;
      });
    }
    return when(this);
  },
  cache: function () {
    if (!this.isCached() && !this.isBundled()) {
      return cache(this).then(function (dependency) {
        console.info(chalk.yellow('↓ %s from %s'), dependency.getId(), dependency.graph.resolved);
        return dependency;
      });
    }
    return when(this);
  },
  config: null,
  getBundleName: function () {
    var extension = this.config.options.compress ? '.tgz' : '.tar';
    var name = this.name.replace(/\//g, '-');
    var version = this.graph.version;
    return name + '-' + version + extension;
  },
  getId: function () {
    return this.name + '@' + this.graph.version;
  },
  getPathToBundle: function () {
    var directory = this.config.path.shrinkpack;
    return path.join(directory, this.getBundleName());
  },
  getPathToNpmCache: function () {
    return path.join(this.config.path.npmCache, this.name, this.graph.version, 'package.tgz');
  },
  getScope: function () {
    var scope = this.name.substring(0, this.name.indexOf('/'));
    return scope === this.name ? '' : scope;
  },
  isBundled: function () {
    return this.getPathToBundle() in this.config.bundle;
  },
  isCached: function () {
    return this.getPathToNpmCache() in this.config.npmCache;
  },
  isResolved: function () {
    return Boolean(this.graph.resolved);
  },
  resolve: function () {
    if (!this.isResolved()) {
      return resolve(this).then(function (dependency) {
        console.info(chalk.green('✓ set missing "resolved" property for %s to %s'), dependency.getId(), dependency.graph.resolved);
        return dependency;
      });
    }
    return when(this);
  },
  rewriteGraph: function () {
    var relative = path.relative(this.config.path.project, this.getPathToBundle());
    this.graph.resolved = './' + relative.split('\\').join('/');
    return when(this);
  },
  synchronise: function () {
    return when(this)
      .then(this.resolve.bind(this))
      .then(this.cache.bind(this))
      .then(this.bundle.bind(this))
      .then(this.rewriteGraph.bind(this))
      .catch(function (err) {
        console.error(chalk.red('! failed to resolve tarball for %s'), this.getId());
        console.error(err);
      }.bind(this));
  }
};
