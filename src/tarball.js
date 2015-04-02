var os = require('os');
var path = require('path');

var isWindows = /^win[0-9]{2}$/.test(os.platform());
var HOME = process.env[isWindows ? 'APPDATA' : 'HOME'];
var CACHE = isWindows ? 'npm-cache' : '.npm';

function getProjectPath() {
  return process.env.PWD || process.cwd();
}

module.exports = {

  getRegistryUrl: function(name, version) {
    return 'https://registry.npmjs.org/' +
      name +
      '/-/' +
      name +
      '-' +
      version +
      '.tgz';
  },

  getCachePath: function(name, version) {
    if (name && version) {
      return path.resolve(
        path.join(
          HOME,
          CACHE,
          name,
          version,
          '/package.tgz'
        )
      );
    }
    return path.resolve(
      path.join(
        HOME,
        CACHE
      )
    );
  },

  getSavePath: function(name, version) {
    if (name && version) {
      return path.resolve(
        path.join(
          getProjectPath(),
          'node_shrinkwrap',
          name + '-' + version + '.tgz'
        )
      );
    }
    return path.resolve(
      path.join(
        getProjectPath(),
        'node_shrinkwrap'
      )
    );
  }

};
