export default {
  inject: {
    theme: {
      from: 'theme',
      default: 'default',
    },
  },

  computed: {
    themeCssClass() {
      return this.theme
        ? {
            [`theme-${this.theme}`]: !!this.theme,
          }
        : {};
    },
  },
};
