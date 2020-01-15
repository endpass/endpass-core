const path = require('path');
const cp = require('child_process');
const notifier = require('node-notifier');

/**
 * @param {string} cmd
 * @returns {string}
 */
const exec = cmd =>
  cp
    .execSync(cmd)
    .toString()
    .trim();

/**
 * @param {string} _path
 * @param {object} config
 * @returns {string} string
 */
const assetsPath = (_path, config) => {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path);
};

/**
 * @param {object} packageConfig
 * @returns {Function}
 */
const createNotifierCallback = packageConfig =>
  /**
   * @param {string} severity
   * @param {Array<{file: string, name: string}>} errors
   * @returns {void}
   */
  (severity, errors) => {
    if (severity !== 'error') return;

    const error = errors[0];
    const filename = error.file && error.file.split('!').pop();

    notifier.notify({
      title: packageConfig.name,
      message: `${severity}: ${error.name}`,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png'),
    });
  };

/**
 * @returns {string}
 */
const getCommitHash = () => exec('git rev-parse --short HEAD');

module.exports = {
  exec,
  assetsPath,
  createNotifierCallback,
  getCommitHash,
};
