const overrideFilesRules = require('./overrideFilesRules');

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
  plugins: ['prettier', 'json', '@typescript-eslint'],
  parser: 'babel-eslint',
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
    ecmaVersion: 2018,
    ecmaFeatures: {
      "jsx": true,
      "modules": true,
      generators: true,
    }
  },
  overrides: [
    overrideFilesRules.tests,
    overrideFilesRules.typescript,
  ],
};
