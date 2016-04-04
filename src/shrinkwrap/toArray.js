'use strict';

// 3rd party modules

var path = require('path');
var uniq = require('lodash.uniq');

// modules

var getTarballName = require('./getTarballName');
var recurse = require('./recurse');

// public

module.exports = toArray;

// implementation

function toArray (options) {
  var deps = [];

  recurse(options.graph, add);

  return uniq(deps, getid);

  function add (name, dep) {
    deps.push(decorate(name, dep));
  }

  function decorate (name, meta) {
    return {
      id: name + '@' + meta.version,
      name: name,
      shrinkwrap: meta,
      tarball: {
        shrinkpack: getShrinkpackPath(name, meta),
        npm: getNpmCachePath(name, meta)
      }
    };
  }

  function getShrinkpackPath (name, meta) {
    return path.join(options.path.shrinkpack, getTarballName(name, meta.version));
  }

  function getNpmCachePath (name, meta) {
    return path.join(options.path.npmCache, name, meta.version, 'package.tgz');
  }

  function getid (decoratedDep) {
    return decoratedDep.id;
  }
}
