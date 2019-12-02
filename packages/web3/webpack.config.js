const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const pkg = require('./package.json');
// eslint-disable-next-line no-unused-vars
const outputList = require('./entryPoints.json');

const createConfig = ({ entry, filename, library }) => {
  return {
    entry: path.resolve(__dirname, 'dist', entry),
    //  devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename,
      library,
      libraryExport: 'default',
      libraryTarget: 'umd',
    },
  };
};

const createConfigs = ({ legacyFilename, ...props }) => {
  return [
    createConfig(props),
    // TODO: for old legacy browser urls, need remove after some time
    createConfig({
      ...props,
      filename: legacyFilename,
    }),
  ];
};

const createList = configs => {
  const lastConfig = configs[configs.length - 1];
  lastConfig.plugins = lastConfig.plugins || [];
  lastConfig.plugins.push(
    new CopyPlugin([
      {
        from: './src',
        to: './src',
      },
      'package.json',
      'README.md',
    ]),
  );
  return configs;
};

module.exports = createList([
  ...createConfigs({
    entry: pkg.umd,
    filename: pkg.main,
    legacyFilename: 'Web3Api.browser.js',
    library: 'Web3Api',
  }),

  // plugins
  // ...outputList.reduce((list, plugin) => {
  //   const newConfigs = createConfigs({
  //     entry: plugin.umd,
  //     filename: plugin.main,
  //     legacyFilename: plugin.browser,
  //     library: plugin.library,
  //   });
  //   return list.concat(newConfigs);
  // }, []),
]);
