const path = require('path');
const ENV = require('./test.env');

module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue', 'ts', 'tsx', 'jsx', 'node'],
  testMatch: ['<rootDir>/**/__tests__/*.js'],

  globals: {
    ENV,
  },
  transform: {
    '^.+\\.js$':'babel-jest',
  },
};
