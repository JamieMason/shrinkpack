// 3rd party modules
var chalk = require('chalk');

// Public
module.exports = displayFailure;

// Implementation
function displayFailure(err) {
  console.error(
    chalk.red('! Please raise an issue at %s\n\n%s'),
    chalk.underline('https://github.com/JamieMason/shrinkpack/issues'),
    String(err.stack).replace(/^/gm, '    ')
  );
  process.exit(1); // eslint-disable-line unicorn/no-process-exit
}
