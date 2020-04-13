<script>
export default {
  name: 'FilePasteAtom',

  methods: {
    handlePaste(e) {
      const { files } = e.clipboardData;
      if (!files || !files.length) {
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
