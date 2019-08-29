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
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: ['*.spec.js', '**/mocks/**/*.js'],
      rules: {
        'global-require': 'off',
      },
    },
    {
      files: ['*.ts'],
      plugins: ['@typescript-eslint'],
      parserOptions: {
        parser: '@typescript-eslint/parser'
      },
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error', {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false
        }]
      }
    }
  ],
};
