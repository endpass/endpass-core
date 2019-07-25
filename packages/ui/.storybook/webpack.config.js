const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const iconsList = fs
  .readdirSync(path.resolve(__dirname, '../src/assets/svg/icons'))
  .filter(file => /\.svg$/.test(file))
  .map(file => file.replace(/\.svg$/, ''));

module.exports = async ({ config }) => {
  const srcPath = path.resolve(__dirname, '../src');
  const fileLoaderRule = config.module.rules.find(rule =>
    rule.test.test('.svg'),
  );

  fileLoaderRule.exclude = srcPath;

  config.resolve.alias['@'] = srcPath;

  config.module.rules.push({
    test: /\.(postcss|scss)$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
    include: srcPath,
  });

  config.module.rules.push({
    test: /\.svg$/,
    loader: 'raw-loader',
    include: srcPath,
  });

  config.plugins.push(
    new webpack.DefinePlugin({
      icons: JSON.stringify(iconsList),
    }),
  );

  return config;
};
