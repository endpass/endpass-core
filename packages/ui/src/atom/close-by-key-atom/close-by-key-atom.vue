<script>
export default {
  name: 'CloseByKeyAtom',
  methods: {
    onKeyUp(e) {
      if (e.keyCode === 27 || e.key === 'Escape') {
        this.$emit('close', e);
      }
    },
  },
  beforeMount() {
    window.addEventListener('keyup', this.onKeyUp);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.onKeyUp);
  },
  render(createElement) {
    return createElement('div', this.$slots.default);
  },
};
</script>
