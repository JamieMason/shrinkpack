// modules
var fs = require('../lib/fs');

// public
module.exports = getGraph;

// implementation
function getGraph(location) {
  return fs.readFile(location, {encoding: 'utf8'})
    .then(onSuccess, onError);

  function onSuccess(graph) {
    return JSON.parse(graph);
  }

  function onError() {
    throw new Error('! npm-shrinkwrap.json is missing, create it using `npm shrinkwrap --dev` then try again');
  }
}
