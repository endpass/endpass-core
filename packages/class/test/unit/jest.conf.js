const path = require('path');
const ENV = require('../env/test.env');

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx', 'jsx', 'node'],
  moduleNameMapper: {
    '^fixtures/(.*)$': '<rootDir>/test/unit/fixtures/$1',
    '^mocks/(.*)$': '<rootDir>/test/unit/mocks/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '<rootDir>/test/unit/**/*.spec.js',
    '<rootDir>/**/__tests__/*.js',
  ],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpe?g|ttf|woff2?|svg)$':
      'jest-transform-stub',
  },
  // globals as webpack DefinePlugin mocks
  globals: {
    ENV,
  },
  transformIgnorePatterns: ['node_modules'],
  setupFiles: ['<rootDir>/test/unit/setup', 'jest-canvas-mock'],
  setupFilesAfterEnv: ['<rootDir>/test/unit/setupTests'],
};
