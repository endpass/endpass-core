const base = require('./base');

module.exports = {
  ...base,
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    rules: {
      'prettier/prettier': ['error'],
    },
    'implicit-arrow-linebreak': 'off',
    'no-empty': 'warn',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'func-names': 0,
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],
    'import/no-unresolved': [
      'error',
      {
        ignore: ['@', 'fixtures', 'mocks'],
      },
    ],
  },
};
