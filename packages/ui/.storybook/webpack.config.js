const path = require('path');

module.exports = async ({ config }) => {
  const srcPath = path.resolve(__dirname, '../src');
  const fileLoaderRule = config.module.rules.find(rule => rule.test.test('.svg'));
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

  return config;
};
