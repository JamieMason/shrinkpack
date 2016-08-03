// modules
var analyse = require('../analyse');
var update = require('../update');
var displayFailure = require('./display-failure');
var displaySummary = require('./display-summary');

// public
module.exports = {
  run: runCli
};

// implementation
function runCli(directory) {
  return analyse(directory)
    .then(update, onFail)
    .then(displaySummary, onFail)
    .catch(onFail);
}

function onFail(err) {
  displayFailure(err);
}
