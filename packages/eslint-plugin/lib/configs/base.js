module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  globals: {
    Cypress: true,
    cy: true,
    ENV: true,
  },
  extends: ['airbnb-base'],
  plugins: ['prettier', 'json'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [
    {
      files: ['*.spec.js', '**/mocks/**/*.js'],
      rules: {
        'global-require': 'off',
      },
    },
  ],
};
