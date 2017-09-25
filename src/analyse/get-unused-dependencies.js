// 3rd party modules
var when = require('when');

// Public
module.exports = getUnusedDependencies;

// Implementation
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
