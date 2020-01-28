module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue', 'ts', 'tsx', 'jsx', 'node'],
  testMatch: ['<rootDir>/test/unit/**/*.spec.js'],
  moduleNameMapper: {
    '^fixtures/(.*)$': '<rootDir>/test/unit/fixtures/$1',
    '^mocks/(.*)$': '<rootDir>/test/unit/mocks/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules'],
  setupFiles: ['<rootDir>/test/unit/setup'],
  setupFilesAfterEnv: ['<rootDir>/test/unit/setupTests'],
};
