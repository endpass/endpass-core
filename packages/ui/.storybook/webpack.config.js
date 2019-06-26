const path = require('path');

module.exports = async ({ config }) => {
  const SRC_PATH = path.resolve(__dirname, '../src');
  const fileLoaderRule = config.module.rules.find(rule =>
    rule.test.test('.svg'),
  );
  const rules = [
    {
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
      include: SRC_PATH,
    },
    {
      test: /\.(woff2?|eot|ttf)/,
      loader: 'url-loader',
    },
    {
      test: /\.svg$/,
      loader: 'raw-loader',
      include: SRC_PATH,
    },
  ];

  fileLoaderRule.exclude = SRC_PATH;
  config.resolve.alias['@'] = SRC_PATH;
  config.module.rules.push(...rules);

  return config;
};
