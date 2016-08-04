// 3rd party modules
var chalk = require('chalk');

// modules
var fs = require('../lib/fs');

// public
module.exports = getGraph;

// implementation
function getGraph(config) {
  console.log(chalk.blue('i rewriting ' + config.path.graph));
  return fs.writeFile(config.path.graph, JSON.stringify(config.graph, null, 2), {encoding: 'utf8'})
    .then(onSuccess, onError);

  function onSuccess() {
    return config.path.graph;
  }

  function onError() {
    throw new Error('! failed to write to npm-shrinkwrap.json');
  }
}
