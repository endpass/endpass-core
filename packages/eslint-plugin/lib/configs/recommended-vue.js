const recommended = require('./recommended');

module.exports = {
  ...recommended,
  plugins: [...recommended.plugins, 'json'],
  extends: [...recommended.extends, 'plugin:vue/recommended', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.vue'],
      },
    },
  },
  rules: {
    ...recommended.rules,
    'prettier/prettier': 'off',
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
