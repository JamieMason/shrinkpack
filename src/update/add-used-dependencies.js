// 3rd party modules
var when = require('when');

// public
module.exports = addUsedDependencies;

// implementation
function addUsedDependencies(config) {
  return when.all(
    config.deps.map(function (dependency) {
      return dependency.synchronise();
    })
  );
}
