const path = require('path');

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
  },
  transformIgnorePatterns: ['node_modules', 'dist'],
  setupFiles: ['<rootDir>/test/unit/setup'],
  setupFilesAfterEnv: ['<rootDir>/test/unit/setupTests'],
};
