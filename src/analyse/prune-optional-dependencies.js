import when from 'when';
import fs from '../lib/fs';

export default pruneOptionalDependencies;

function pruneOptionalDependencies(config) {
  return config.options.keepOptional ? when(config.graph) : getPackageJson();

  function getPackageJson() {
    return fs
      .readFile(config.path.manifest, { encoding: 'utf8' })
      .then(onSuccess, onError);

    function onSuccess(manifest) {
      const pkg = JSON.parse(manifest);
      if (pkg.optionalDependencies) {
        for (const name in pkg.optionalDependencies) {
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
