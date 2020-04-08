<script>
export default {
  name: 'FilePasteAtom',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handlePaste(e) {
      const { files } = e.clipboardData;
      if (this.disabled || !files || !files.length) {
        return;
      }
      this.$emit('change', files);
    },
  },

  beforeMount() {
    document.addEventListener('paste', this.handlePaste, false);
  },

  beforeDestroy() {
    document.removeEventListener('paste', this.handlePaste, false);
  },

  render(createElement) {
    return createElement('div', this.$slots.default);
  },
};
</script>
