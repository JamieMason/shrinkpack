// 3rd party modules
var when = require('when');

// public
module.exports = getUnusedDependencies;

// implementation
function getUnusedDependencies(config) {
  return when(config.deps.reduce(updateIndex, clone(config.bundle)));

  function updateIndex(unused, dependency) {
    var location = dependency.getPathToBundle();
    if (location in unused) {
      delete unused[location];
    }
    return unused;
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }
}
