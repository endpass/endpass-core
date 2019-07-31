export default {
  inject: ['theme'],
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
