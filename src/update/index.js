// 3rd party modules
var when = require('when');

// modules
var addUsedDependencies = require('./add-used-dependencies');
var deleteUnusedDependencies = require('./delete-unused-dependencies');
var rewriteGraph = require('./rewrite-graph');

// public
module.exports = update;

// implementation
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
