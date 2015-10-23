'use strict';

// 3rd party modules

var guard = require('when/guard');
var npm = require('npm');
var when = require('when');

// Public

module.exports = {
    ensure: guard(guard.n(10), ensurePackageIsCached)
};

// Implementation

function ensurePackageIsCached(dep) {
    return when.promise(promiseCacheEntry);

    function promiseCacheEntry(resolve, reject, notify) {

        notify('cache ' + dep.id);

        npm.commands.cache.read(dep.name, dep.shrinkwrap.version, false, onComplete);

        function onComplete(err) {
            if (err) {
                reject('error adding ' + dep.id + ' to npm cache: ' + err.toString());
            } else {
                resolve(dep);
            }
        }
    }
}
