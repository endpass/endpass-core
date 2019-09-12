module.exports = {
  extends: ['plugin:@endpass/endpass/recommended-vue'],
  overrides: [
    {
      files: ['*.stories.js', '**/stories/**/*.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
