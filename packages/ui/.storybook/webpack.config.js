const path = require('path');

module.exports = async ({ config }) => {
  config.resolve.alias['@'] = path.resolve(__dirname, '../src');
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
          data: '@import "@/scss/variables.scss";',
        },
      },
    ],
    include: path.resolve(__dirname, '../src'),
  });
  return config;
};
