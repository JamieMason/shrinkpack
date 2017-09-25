// 3rd party modules
var when = require('when');

// Modules
var addUsedDependencies = require('./add-used-dependencies');
var deleteUnusedDependencies = require('./delete-unused-dependencies');
var rewriteGraph = require('./rewrite-graph');

// Public
module.exports = update;

// Implementation
function update(config) {
  return when.join(
    addUsedDependencies(config),
    deleteUnusedDependencies(config)
  ).then(function () {
    return rewriteGraph(config);
  }).then(function () {
    return config;
  });
}
