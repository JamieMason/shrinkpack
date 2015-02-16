var childProcess = require('child_process');
var fs = require('fs');
var is = require('is');
var path = require('path');
var shell = require('shelljs');

var log = require('./src/log');
var tarball = require('./src/tarball');
var traverse = require('./src/traverse');

function getProjectPath() {
  return process.env.PWD;
}

function getFilePath(file) {
  return path.normalize(
    path.join(
      getProjectPath(),
      file
    )
  );
}

module.exports = {

  update: function(done) {
    module.exports.clean(function() {
      module.exports.rebuild(function() {
        module.exports.save(done);
      });
    });
  },

  clean: function(done) {

    var graph = getFilePath('npm-shrinkwrap.json');
    var dependencies = getFilePath('node_modules');
    var savePath = tarball.getSavePath();

    log.info('clean', log.underline(getProjectPath()));

    shell.rm('-f', graph);
    shell.rm('-rf', dependencies);
    shell.rm('-rf', savePath);

    done(null);

  },

  rebuild: function(done) {

    var graph = getFilePath('npm-shrinkwrap.json');
    var dependencies = getFilePath('node_modules');

    log.info('npm install into', log.underline(dependencies));

    console.log(log.styles.gray.open);

    shell.exec('npm install');

    console.log(log.styles.gray.close);

    log.info('npm shrinkwrap into', log.underline(graph));

    shell.exec('npm shrinkwrap', {
      silent: true
    });

    done(null);

  },

  save: function(done) {

    log.info('analysing dependency graph');

    var graph = getFilePath('npm-shrinkwrap.json');
    var graphData = require(graph);
    var projectPath = getProjectPath();
    var savePath = tarball.getSavePath();

    log.info('saving dependencies to', log.underline(savePath));

    shell.mkdir('-p', savePath);

    traverse(graphData, function(value, chain) {

      if (is.object(value) && is.string(value.resolved)) {

        var name = chain[chain.length - 1];
        var version = value.version;
        var shortName = name + '@' + version;
        var url = tarball.getRegistryUrl(name, version);
        var cached = tarball.getCachePath(name, version);
        var packed = tarball.getSavePath(name, version);

        value.resolved = path.relative(projectPath, packed);

        shell.exec('npm cache add ' + shortName);

        log.info('save', log.underline(packed));

        shell.cp('-f', cached, packed);

      }

    });

    log.info('update', log.underline(graph));

    fs.writeFileSync(graph, JSON.stringify(graphData, null, 2));

    done(null);

  }

};

module.exports.update(function() {
  log.info('done');
});
