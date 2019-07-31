export default {
  computed: {
    isDisabled() {
      const { disabled } = this.$attrs;
      if (disabled === false || !Object.prototype.hasOwnProperty.call(this.$attrs, 'disabled')) {
        return false;
      }
      return true;
    },
  },
};
