// 3rd party modules
var when = require('when');

// Modules
var forEachNestedDependency = require('../lib/for-each-nested-dependency');
var Dependency = require('./dependency');

// Public
module.exports = getDependencies;

// Implementation
function getDependencies(config) {
  Dependency.setConfig(config);
  var dependencies = [];
  var handler = config.options.keepOptional ? addDependency : addIfMandatory;
  forEachNestedDependency(config.graph, handler);
  return when(dependencies);

  function addDependency(key, node) {
    dependencies.push(new Dependency(key, node));
  }

  function addIfMandatory(key, node, parentNode) {
    if (node.optional === true) {
      delete parentNode[key];
    } else {
      addDependency(key, node);
    }
  }
}
