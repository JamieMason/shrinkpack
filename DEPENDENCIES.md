# shrinkpack 

Fast, resilient, reproducible builds with npm install.

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install shrinkpack --save
```


## Tests

```sh
npm install
npm test
```

## Dependencies

- [chalk](https://github.com/chalk/chalk): Terminal string styling done right. Much color.
- [commander](https://github.com/tj/commander.js): the complete solution for node.js command-line programs
- [execa](https://github.com/sindresorhus/execa): A better `child_process`
- [graceful-fs](https://github.com/isaacs/node-graceful-fs): A drop-in replacement for fs, making various improvements.
- [gunzip-maybe](https://github.com/mafintosh/gunzip-maybe): Transform stream that gunzips its input if it is gzipped and just echoes it if not
- [lodash.assign](https://github.com/lodash/lodash): The lodash method `_.assign` exported as a module.
- [when](https://github.com/cujojs/when): A lightweight Promises/A+ and when() implementation, plus other async goodies.

## Dev Dependencies

- [ava](https://github.com/avajs/ava): Futuristic test runner 🚀
- [commit-release](https://github.com/JamieMason/commit-release): Commit and tag a release for a conventional changelog project.
- [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog): Commitizen adapter following the conventional-changelog format.
- [husky](https://github.com/typicode/husky): Prevents bad commit or push (git hooks, pre-commit/precommit, pre-push/prepush, post-merge/postmerge and all that stuff...)
- [rimraf](https://github.com/isaacs/rimraf): A deep deletion module for node (like `rm -rf`)
- [validate-commit-msg](https://github.com/kentcdodds/validate-commit-msg): Script to validate a commit message follows the conventional changelog standard
- [xo](https://github.com/sindresorhus/xo): JavaScript happiness style linter ❤️


## License

MIT

