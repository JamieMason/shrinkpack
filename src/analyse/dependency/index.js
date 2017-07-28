import path from 'path';
import chalk from 'chalk';
import when from 'when';
import bundle from './bundle';
import cache from './cache';
import resolve from './resolve';

export default Dependency;

function Dependency(name, graph) {
  this.graph = graph;
  this.name = name;
}

// statics
Dependency.setConfig = config => {
  Dependency.prototype.config = config;
};

// shared
Dependency.prototype = {
  bundle() {
    if (!this.isBundled()) {
      return bundle(this).then(dependency => {
        console.info(chalk.green('+ %s'), dependency.getBundleName());
        return dependency;
      });
    }
    return when(this);
  },
  cache() {
    if (!this.isCached() && !this.isBundled()) {
      return cache(this).then(dependency => {
        console.info(
          chalk.yellow('↓ %s from %s'),
          dependency.getId(),
          dependency.graph.resolved
        );
        return dependency;
      });
    }
    return when(this);
  },
  config: null,
  getBundleName() {
    const extension = this.config.options.compress ? '.tgz' : '.tar';
    const name = this.name.replace(/\//g, '-');
    const version = this.graph.version;
    return `${name}-${version}${extension}`;
  },
  getId() {
    return `${this.name}@${this.graph.version}`;
  },
  getPathToBundle() {
    const directory = this.config.path.shrinkpack;
    return path.join(directory, this.getBundleName());
  },
  getPathToNpmCache() {
    return path.join(
      this.config.path.npmCache,
      this.name,
      this.graph.version,
      'package.tgz'
    );
  },
  getScope() {
    const scope = this.name.substring(0, this.name.indexOf('/'));
    return scope === this.name ? '' : scope;
  },
  isBundled() {
    return this.getPathToBundle() in this.config.bundle;
  },
  isCached() {
    return this.getPathToNpmCache() in this.config.npmCache;
  },
  isResolved() {
    return Boolean(this.graph.resolved);
  },
  resolve() {
    if (!this.isResolved()) {
      return resolve(this).then(dependency => {
        console.info(
          chalk.green('✓ set missing "resolved" property for %s to %s'),
          dependency.getId(),
          dependency.graph.resolved
        );
        return dependency;
      });
    }
    return when(this);
  },
  rewriteGraph() {
    const relative = path.relative(
      this.config.path.project,
      this.getPathToBundle()
    );
    this.graph.resolved = `./${relative.split('\\').join('/')}`;
    return when(this);
  },
  synchronise() {
    return when(this)
      .then(this.resolve.bind(this))
      .then(this.cache.bind(this))
      .then(this.bundle.bind(this))
      .then(this.rewriteGraph.bind(this))
      .catch(err => {
        console.error(
          chalk.red('! failed to resolve tarball for %s'),
          this.getId()
        );
        console.error(err);
      });
  }
};
