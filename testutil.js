var fs = require('fs');
var path = require('path');
var format = require('util').format;
var os = require('os');
var execa = require('execa');
var when = require('when');
var whenNode = require('when/node');

var rimraf = whenNode.lift(require('rimraf'));

var mkdir = whenNode.lift(fs.mkdir);
var readFile = whenNode.lift(fs.readFile);

module.exports = {
  setNpmVersion: function (npmVersion) {
    return execa('npm', ['install', '-g', format('npm@%s', npmVersion)]);
  },
  getNpmVersion: function () {
    return execa.stdout('npm', ['-v']);
  },
  createTestApp: function (dirPath, packagePath) {
    return mkdir(dirPath).then(function () {
      return when.promise(function (res, rej) {
        var read = fs.createReadStream(packagePath);
        var write = fs.createWriteStream(path.join(dirPath, 'package.json'));
        read.pipe(write);

        read.on('error', rej);
        write.on('error', rej);
        write.on('close', res);
      });
    });
  },
  npmInstall: function (project) {
    return execa('npm', ['install'], {cwd: project});
  },
  shrinkwrap: function (project) {
    return execa('npm', ['shrinkwrap', '--dev'], {cwd: project});
  },
  shrinkpack: function (project) {
    return execa('shrinkpack', {cwd: project});
  },
  linkShrinkpack: function (root) {
    return execa('npm', ['link'], {cwd: root});
  },
  unlinkShrinkpack: function (root) {
    return execa('npm', ['unlink', 'shrinkpack'], {cwd: root});
  },
  getShrinkwrapFile: function (project) {
    return readFile(path.join(project, 'npm-shrinkwrap.json'), {
      encoding: 'utf8'
    });
  },
  rmDirs: function () {
    var dirs = [].slice.call(arguments);
    return when.all(dirs.map(function (dir) {
      return rimraf(dir);
    }));
  },
  getAllDirFiles: function (root) {
    return execa.shell('find . | sort', {cwd: root}).then(function (output) {
      return output.stdout.split(os.EOL);
    });
  }
  // runSinopia: function (configPath) {
  //   return when.promise(function (res, rej) {
  //     var sinopiaExecutablePath = path.resolve(require.resolve('sinopia'), '../../.bin/sinopia');
  //     var child = execa.spawn(sinopiaExecutablePath, ['-c', configPath]);
  //     var stopServer = function () {
  //       child.kill();
  //     };
  //
  //     child.stdout.setEncoding('utf8');
  //     child.stdout.on('data', function (data) {
  //       if (data.indexOf('http address') > -1) {
  //         res(stopServer);
  //       }
  //     });
  //
  //     child.on('error', rej);
  //   });
  // }
};
