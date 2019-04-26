const path = require('path');

module.exports = async ({ config }) => {
  config.resolve.alias['@'] = path.resolve(__dirname, '../src');
  config.module.rules.push({
    test: /\.(postcss|scss)$/,
    use: [
      'vue-style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          data: '@import "@/scss/variables.scss";',
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: './.storybook/',
          },
        },
      },
    ],
    include: path.resolve(__dirname, '../src'),
  });
  return config;
};
