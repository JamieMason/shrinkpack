module.exports = {
  run: runCli
};

// modules
var shrinkpack = require('../../index');
var describeChanges = require('./describeChanges');
var displayFailure = require('./displayFailure');
var displaySummary = require('./displaySummary');

function runCli (directory) {
  return shrinkpack.analyse(directory)
    .then(describeChanges, onFail)
    .then(shrinkpack.update, onFail)
    .then(displaySummary, onFail)
    .catch(onFail);
}

function onFail (err) {
  displayFailure(err);
}
