import when from 'when';

export default addUsedDependencies;

function addUsedDependencies(config) {
  return when.all(config.deps.map(dependency => dependency.synchronise()));
}
