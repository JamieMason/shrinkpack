var chalk = require('chalk');

module.exports = Object.create(chalk);

module.exports.info = console.log.bind(console);
