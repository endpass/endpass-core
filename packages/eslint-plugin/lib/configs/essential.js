const base = require('./base');

module.exports = {
  ...base,
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-shadow': ['warn'],
    'no-empty': [
      'warn',
      {
        allowEmptyCatch: true,
      },
    ],
    'no-underscore-dangle': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'avoid',
        requirePragma: false,
        insertPragma: false,
      },
    ],
    'no-restricted-syntax': ['error', 'ForInStatement'],
    'no-await-in-loop': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'consistent-return': 'error',
    'operator-linebreak': 'off',
    'space-before-function-paren': 'off',
    'function-paren-newline': 'off',
    'object-curly-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'class-methods-use-this': 'off',
    'func-names': 0,
    'import/no-unresolved': [
      'error',
      {
        ignore: ['@', 'fixtures', 'mocks'],
        commonjs: true,
        caseSensitive: true,
      },
    ],
  },
};
