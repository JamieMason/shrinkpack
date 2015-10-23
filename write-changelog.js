#!/usr/bin/env node

'use strict';

var changelog = require('conventional-changelog');
var fs = require('fs');
var pkg = require('./package.json');

changelog({
    version: pkg.version,
    repository: 'https://github.com/JamieMason/shrinkpack'
}, onChangeLog);

function onChangeLog(err, log) {
    if (err) {
        throw new Error(err);
    }
    fs.writeFileSync('CHANGELOG.md', log);
}
