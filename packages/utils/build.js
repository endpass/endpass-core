'use strict';
const path = require('path');

function exec(cmd) {
  return require('child_process')
    .execSync(cmd)
    .toString()
    .trim();
}

exports.assetsPath = function(_path, config) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path);
};

exports.createNotifierCallback = (packageConfig) => {
  const notifier = require('node-notifier');

  return (severity, errors) => {
    if (severity !== 'error') return;

    const error = errors[0];
    const filename = error.file && error.file.split('!').pop();

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png'),
    });
  };
};

exports.exec = exec;

exports.getCommitHash = () => exec('git rev-parse --short HEAD');
