<script>
export default {
  name: 'OutsideClickAtom',
  methods: {
    onClickAnything(e) {
      const [target] = this.$slots.default

      if (!target) return

      let currentNode = e.target;

      while (currentNode.parentNode) {
        currentNode = currentNode.parentNode;

        if (target.elm === currentNode.parentNode) break;
        if (!currentNode.parentNode) {
          this.$emit('click')
          break;
        }
      }
    },
  },
  beforeMount() {
    document.body.addEventListener('click', this.onClickAnything);
  },
  beforeDestroy() {
    document.body.removeEventListener('click', this.onClickAnything);
  },
  render(createElement) {
    return this.$slots.default;
  },
};
</script>
