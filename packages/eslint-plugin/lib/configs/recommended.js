const essential = require('./essential');

module.exports = {
  ...essential,
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
  rules: {
    ...essential.rules,
    'import/extensions': ['error', 'ignorePackages', {
      'js': 'never',
      'jsx': 'never'
    }],
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
  },
};
