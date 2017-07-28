import analyse from '../analyse';
import update from '../update';
import displayFailure from './display-failure';
import displaySummary from './display-summary';

export default {
  run: runCli
};

function runCli(options) {
  return analyse(options)
    .then(update, onFail)
    .then(displaySummary, onFail)
    .catch(onFail);
}

function onFail(err) {
  displayFailure(err);
}
