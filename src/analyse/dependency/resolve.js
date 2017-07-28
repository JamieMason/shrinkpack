import childProcess from '../../lib/child-process';

export default resolve;

function resolve(dependency) {
  return childProcess
    .exec(`npm view ${dependency.getId()} --json`, { encoding: 'utf8' })
    .then(onSuccess, onError);

  function onSuccess(result) {
    const json = JSON.parse(result.stdout);
    if (json && json.dist && json.dist.tarball) {
      dependency.graph.resolved = json.dist.tarball;
      return dependency;
    }
    throw new Error(
      `! ${dependency.getId()} has no "dist.tarball" in \`npm view ${dependency.getId()} --json\``
    );
  }

  function onError() {
    throw new Error(
      `! failed to call \`npm view ${dependency.getId()} --json\``
    );
  }
}
