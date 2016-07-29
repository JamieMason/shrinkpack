// 3rd party modules
var fs = require('graceful-fs');
var whenNode = require('when/node');

// public
module.exports = getGraph;

// implementation
function getGraph (location) {
  return whenNode.call(fs.readFile, location, { encoding: 'utf8' })
    .then(onSuccess, onError);

  function onSuccess (graph) {
    return JSON.parse(graph);
  }

  function onError () {
    throw new Error('! npm-shrinkwrap.json is missing, create it using `npm shrinkwrap --dev` then try again');
  }
}
