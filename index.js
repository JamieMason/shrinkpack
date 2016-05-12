var task = {
  init: require('./src/init'),
  resolveTarball: require('./src/resolveTarball'),
  addToCache: require('./src/addToCache'),
  addToBundle: require('./src/addToBundle'),
  rewriteGraph: require('./src/rewriteGraph'),
  removeFromBundle: require('./src/removeFromBundle')
};

module.exports = {
  analyse: analyse,
  update: update
};

function analyse (directory) {
  return Promise.resolve(task.init(directory));
}

function update (config) {
  return resolveTarball()
    .then(addToCache, onFail)
    .then(addToBundle, onFail)
    .then(removeFromBundle, onFail)
    .then(rewriteGraph, onFail)
    .then(onSuccess, onFail)
    .catch(onFail);

  function resolveTarball () {
    return task.resolveTarball(config.deps.missingAndUnresolved);
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

  function onSuccess () {
    return config;
  }

  function onFail (err) {
    return Promise.reject(err);
  }
}
