#!/usr/bin/env node

// tasks
var task = {
  init: require('./task/init'),
  describeChanges: require('./task/describeChanges'),
  resolveTarball: require('./task/resolveTarball'),
  addToCache: require('./task/addToCache'),
  addToBundle: require('./task/addToBundle'),
  rewriteGraph: require('./task/rewriteGraph'),
  removeFromBundle: require('./task/removeFromBundle'),
  displaySummary: require('./task/displaySummary'),
  displayFailure: require('./task/displayFailure')
};

var config = task.init();

describeChanges()
  .then(resolveTarball, displayFailure)
  .then(addToCache, displayFailure)
  .then(addToBundle, displayFailure)
  .then(removeFromBundle, displayFailure)
  .then(rewriteGraph, displayFailure)
  .then(displaySummary, displayFailure)
  .catch(displayFailure);

function describeChanges () {
  return task.describeChanges(config);
}

function resolveTarball () {
  return task.resolveTarball(config.deps.unresolved);
}

function addToCache () {
  return task.addToCache(config.deps.missingFromCache);
}

function addToBundle () {
  return task.addToBundle(config.deps.missingFromBundle);
}

function rewriteGraph () {
  return task.rewriteGraph(config.path.graph, config.deps.all, config.graph);
}

function removeFromBundle () {
  return task.removeFromBundle(config.deps.removeFromBundle);
}

function displaySummary () {
  return task.displaySummary(config);
}

function displayFailure (err) {
  return task.displayFailure(err);
}
