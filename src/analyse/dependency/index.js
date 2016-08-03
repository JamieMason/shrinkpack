// node modules
var path = require('path');

// 3rd party modules
var chalk = require('chalk');
var when = require('when');

// modules
var bundle = require('./bundle');
var cache = require('./cache');
var resolve = require('./resolve');

// public
module.exports = Dependency;

// implementation
function Dependency(name, graph) {
  this.graph = graph;
  this.name = name;
}

// statics
Dependency.setConfig = function (config) {
  Dependency.prototype.config = config;
};

// shared
Dependency.prototype = {
  bundle: function () {
    if (!this.isBundled()) {
      return bundle(this).then(function (dependency) {
        console.info(chalk.green('+ %s'), dependency.getId());
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
  getId: function () {
    return this.name + '@' + this.graph.version;
  },
  getPathToBundle: function () {
    var directory = this.config.path.shrinkpack;
    var name = this.name.replace(/\//g, '-');
    var version = this.graph.version;
    return path.join(directory, name + '-' + version + '.tgz');
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
