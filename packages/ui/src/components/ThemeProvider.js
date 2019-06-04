export default {
  name: 'ThemeProvider',
  provide() {
    return {
      theme: this.theme,
    };
  },
  props: {
    theme: {
      type: String,
      default: 'default',
    },
  },
  render(createElement) {
    return createElement('div', this.$slots.default);
  },
};
