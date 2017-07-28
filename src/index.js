import analyse from './analyse';
import cli from './cli';
import update from './update';

export default {
  analyse,
  cli: cli.run,
  update
};
