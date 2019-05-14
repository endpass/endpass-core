const recommended = require('./recommended');

module.exports = {
  ...recommended,
  extends: [
    ...recommended.extends,
    'plugin:vue/recommended'
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.vue'],
      },
    },
  },
  rules: {
    ...recommended.rules,
    'max-len': [
      'warn',
      80,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: false,
        ignoreTemplateLiterals: false,
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always',
      },
    ],
    'vue/order-in-components': [
      'error',
      {
        order: [
          'el',
          'name',
          'inheritAttrs',
          'inject',
          'provide',
          ['props', 'propsData'],
          'data',
          'computed',
          'watch',
          'methods',
          'LIFECYCLE_HOOKS',
          'mixins',
          'components',
          [
            'functional',
            'delimiters',
            'comments',
            'directives',
            'filters',
            'parent',
            'extends',
            'model',
            'template',
            'render',
            'renderError',
          ],
        ],
      },
    ],
  },
};
