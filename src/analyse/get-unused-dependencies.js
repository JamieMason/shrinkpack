import when from 'when';

export default getUnusedDependencies;

function getUnusedDependencies(config) {
  return when(config.deps.reduce(updateIndex, clone(config.bundle)));

  function updateIndex(unused, dependency) {
    const location = dependency.getPathToBundle();
    if (location in unused) {
      delete unused[location];
    }
    return unused;
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }
}
