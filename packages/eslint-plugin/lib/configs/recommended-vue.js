const recommended = require('./recommended');

// need remove `parser` in root level for vue-parser allowing sets
const { parser, ...vueConfig } = recommended;

const vueRules = {
  ...recommended.rules,
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
};

const settings = {
  'import/resolver': {
    node: {
      extensions: ['.js', '.jsx', '.vue'],
    },
  },
};

module.exports = {
  ...vueConfig,
  extends: [...recommended.extends, 'plugin:vue/recommended', 'prettier'],
  settings,
  rules: vueRules,
  overrides: [
    {
      files: ['*.vue'],
      extends: [...recommended.extends, 'plugin:vue/recommended'],
      settings,
      rules: {
        ...vueRules,
        'prettier/prettier': 'off',
      },
    },
  ],
};
