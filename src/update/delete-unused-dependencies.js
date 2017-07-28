import chalk from 'chalk';
import when from 'when';
import deleteFile from '../lib/delete-file';

export default deleteUnusedDependencies;

function deleteUnusedDependencies(config) {
  const deletions = [];
  for (const location in config.unusedDependencies) {
    deletions.push(performDeletion(location));
  }
  return when.all(deletions);

  function performDeletion(location) {
    return deleteFile(location).then(onSuccess);
  }

  function onSuccess(location) {
    console.info(chalk.red('- %s'), location.replace(/.+\//, ''));
  }
}
