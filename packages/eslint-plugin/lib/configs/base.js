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
    {
      files: ['*.spec.js', '**/mocks/**/*.js'],
      rules: {
        'global-require': 'off',
      },
    },
    {
      files: ['*.ts'],
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      rules: {
        'no-useless-constructor': 'off',
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
