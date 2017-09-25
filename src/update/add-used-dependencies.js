// 3rd party modules
var when = require('when');

// Public
module.exports = addUsedDependencies;

// Implementation
function addUsedDependencies(config) {
  return when.all(
    config.deps.map(function (dependency) {
      return dependency.synchronise();
    })
  );
}
