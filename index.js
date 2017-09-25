// Modules
var analyse = require('./src/analyse');
var cli = require('./src/cli');
var update = require('./src/update');

// Public
module.exports = {
  analyse: analyse,
  cli: cli.run,
  update: update
};
