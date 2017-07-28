import when from 'when';
import addUsedDependencies from './add-used-dependencies';
import deleteUnusedDependencies from './delete-unused-dependencies';
import rewriteGraph from './rewrite-graph';

export default update;

function update(config) {
  return when
    .join(addUsedDependencies(config), deleteUnusedDependencies(config))
    .then(() => rewriteGraph(config))
    .then(() => config);
}
