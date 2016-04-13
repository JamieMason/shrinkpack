// 3rd party modules
var chalk = require('chalk');
var fs = require('graceful-fs');

// public
module.exports = rewriteGraph;

// implementation
function rewriteGraph (pathToGraph, deps, graph) {
  chalk.blue('i rewriting npm-shrinkwrap.json');
  deps.forEach(setResolved);
  fs.writeFileSync(pathToGraph, JSON.stringify(graph, null, 2), 'utf8');
  return Promise.resolve();
}

function setResolved (dep) {
  dep.shrinkwrap.resolved = dep.bundle;
}
