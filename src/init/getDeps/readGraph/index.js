// 3rd party modules
var path = require('path');

// modules
var recurse = require('./recurse');

// public
module.exports = readGraph;

// implementation
function readGraph (graph, pathToBundle, npmCachePath) {
  var deps = [];

  recurse(graph, function (name, dep) {
    deps.push(decorate(name, dep));
  });

  return deps;

  function decorate (name, meta) {
    return {
      bundle: getShrinkwrapEntry(name, meta),
      id: name + '@' + meta.version,
      name: name,
      scope: getPackageScope(name),
      shrinkwrap: meta,
      tarball: {
        shrinkpack: getShrinkpackPath(name, meta),
        npm: getNpmCachePath(name, meta)
      }
    };
  }

  function getShrinkwrapEntry (name, meta) {
    return './node_shrinkwrap/' + getTarballName(name, meta.version);
  }

  function getShrinkpackPath (name, meta) {
    return path.join(pathToBundle, getTarballName(name, meta.version));
  }

  function getNpmCachePath (name, meta) {
    return path.join(npmCachePath, name, meta.version, 'package.tgz');
  }

  function getTarballName (name, version) {
    return name.replace(/\//g, '-') + '-' + version + '.tgz';
  }

  function getPackageScope (name) {
    var scope = name.substring(0, name.indexOf('/'));
    return (scope !== name) ? scope : '';
  }
}
