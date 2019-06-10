module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['> 1%', 'last 2 versions'],
        },
        modules: false,
      },
    ],
  ],
  plugins: [['@babel/plugin-transform-runtime']],
  env: {
    test: {
      presets: ['@babel/preset-env'],
    },
  },
};
