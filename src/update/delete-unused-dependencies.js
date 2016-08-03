// 3rd party modules
var chalk = require('chalk');
var when = require('when');

// modules
var deleteFile = require('../lib/delete-file');

// public
module.exports = deleteUnusedDependencies;

// implementation
function deleteUnusedDependencies(config) {
  var deletions = [];
  for (var location in config.unusedDependencies) { // eslint-disable-line guard-for-in
    deletions.push(performDeletion(location));
  }
  return when.all(deletions);

  function performDeletion(location) {
    return deleteFile(location)
      .then(onSuccess);
  }

  function onSuccess(location) {
    console.info(chalk.red('- %s'), location.replace(/.+\//, ''));
  }
}
