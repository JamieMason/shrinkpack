'use strict';

// public

module.exports = getTarballName;

// implementation

function getTarballName (name, version) {
  return name.replace(/\//g, '-') + '-' + version + '.tgz';
}
