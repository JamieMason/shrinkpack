import when from 'when';
import forEachNestedDependency from '../lib/for-each-nested-dependency';
import Dependency from './dependency';

export default getDependencies;

function getDependencies(config) {
  Dependency.setConfig(config);
  const dependencies = [];
  const handler = config.options.keepOptional ? addDependency : addIfMandatory;
  forEachNestedDependency(config.graph, handler);
  return when(dependencies);

  function addDependency(key, node) {
    dependencies.push(new Dependency(key, node));
  }

  function addIfMandatory(key, node, parentNode) {
    if (node.optional === true) {
      delete parentNode[key];
    } else {
      addDependency(key, node);
    }
  }
}
