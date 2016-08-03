// 3rd party modules
var when = require('when');

// modules
var forEachNestedDependency = require('../lib/for-each-nested-dependency');
var Dependency = require('./dependency');

// public
module.exports = getDependencies;

// implementation
function getDependencies(config) {
  Dependency.setConfig(config);
  var dependencies = [];
  forEachNestedDependency(config.graph, function (name, graph) {
    dependencies.push(new Dependency(name, graph));
  });
  return when(dependencies);
}
