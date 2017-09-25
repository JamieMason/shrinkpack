// 3rd party modules
var when = require('when');

// Modules
var fs = require('../lib/fs');

// Public
module.exports = pruneOptionalDependencies;

// Implementation
function pruneOptionalDependencies(config) {
  return config.options.keepOptional ? when(config.graph) : getPackageJson();

  function getPackageJson() {
    return fs.readFile(config.path.manifest, {encoding: 'utf8'})
      .then(onSuccess, onError);

    function onSuccess(manifest) {
      var pkg = JSON.parse(manifest);
      if (pkg.optionalDependencies) {
        for (var name in pkg.optionalDependencies) { // eslint-disable-line guard-for-in
          delete config.graph.dependencies[name];
        }
      }
      return config.graph;
    }

    function onError() {
      throw new Error('! failed to prune optional dependencies');
    }
  }
}
