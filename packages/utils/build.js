'use strict';

var path = require('path');

var cp = require('child_process');

var notifier = require('node-notifier');

function exec(cmd) {
  return cp.execSync(cmd).toString().trim();
}

exports.assetsPath = function (_path, config) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};

exports.createNotifierCallback = function (packageConfig) {
  return function (severity, errors) {
    if (severity !== 'error') return;
    var error = errors[0];
    var filename = error.file && error.file.split('!').pop();
    notifier.notify({
      title: packageConfig.name,
      message: "".concat(severity, ": ").concat(error.name),
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    });
  };
};

exports.exec = exec;

exports.getCommitHash = function () {
  return exec('git rev-parse --short HEAD');
};
