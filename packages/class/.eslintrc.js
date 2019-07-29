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
  parser: 'babel-eslint',
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': ['error'],
    'implicit-arrow-linebreak': 'off',
    'no-empty': 'warn',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'max-len': [
      'warn',
      80,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: false,
      },
    ],
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
  overrides: [
    {
      files: ['*.spec.js'],
      rules: {
        'global-require': 'off',
      },
    },
  ],
};
