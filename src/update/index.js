// 3rd party modules
var when = require('when');

// modules
var addUsedDependencies = require('./add-used-dependencies');
var deleteUnusedDependencies = require('./delete-unused-dependencies');

// public
module.exports = update;

// implementation
function update(config) {
  return when(config)
    .then(synchronise)
    .then(function () {
      return config;
    });

  function synchronise(config) {
    return when.join(
      addUsedDependencies(config),
      deleteUnusedDependencies(config)
    );
  }
}
