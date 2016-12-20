// node modules
var fs = require('fs');
var os = require('os');
var path = require('path');

// 3rd party modules
var execa = require('execa');
var when = require('when');
var whenNode = require('when/node');

// implementation
var mkdir = whenNode.lift(fs.mkdir);
var readFile = whenNode.lift(fs.readFile);
var rimraf = whenNode.lift(require('rimraf'));

// public
module.exports = {
  setNpmVersion: function (npmVersion) {
    return execa('npm', ['install', '-g', 'npm@' + npmVersion]);
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
    return execa('shrinkpack', ['--keep-optional'], {cwd: project});
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
};
