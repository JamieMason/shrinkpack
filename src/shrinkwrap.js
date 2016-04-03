'use strict';

// 3rd party modules

var is = require('is');
var path = require('path');
var uniq = require('lodash.uniq');

// Public

module.exports = {
    recurse: recurse,
    toArray: toArray
};

// Implementation

function toArray(options) {

    var deps = [];

    recurse(options.graph, add);

    return uniq(deps, getid);

    function add(name, dep) {
        deps.push(decorate(name, dep));
    }

    function decorate(name, meta) {
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

    function getShrinkpackPath(name, meta) {
        return path.join(options.path.shrinkpack, name.replace(/\//g, '-') + '-' + meta.version + '.tgz');
    }

    function getNpmCachePath(name, meta) {
        return path.join(options.path.npmCache, name, meta.version, 'package.tgz');
    }

    function getid(decoratedDep) {
        return decoratedDep.id;
    }

}

function recurse(object, fn, key) {
    if (is.object(object)) {
        if (is.string(object.resolved)) {
            fn(key, object);
        }
        Object.keys(object).forEach(function(_key) {
            recurse(object[_key], fn, _key);
        });
    }
}
