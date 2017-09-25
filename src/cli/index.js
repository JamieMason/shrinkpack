// Modules
var analyse = require('../analyse');
var update = require('../update');
var displayFailure = require('./display-failure');
var displaySummary = require('./display-summary');

// Public
module.exports = {
  run: runCli
};

// Implementation
function runCli(options) {
  return analyse(options)
    .then(update, onFail)
    .then(displaySummary, onFail)
    .catch(onFail);
}

function onFail(err) {
  displayFailure(err);
}
