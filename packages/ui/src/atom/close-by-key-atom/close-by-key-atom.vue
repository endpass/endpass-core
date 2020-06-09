<script>
export default {
  name: 'CloseByKeyAtom',

  props: {
    stopPropagationElements: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    onKeyUp(e) {
      const isEscape = e.keyCode === 27 || e.key === 'Escape';
      if (!isEscape) return;

      const targetNodeName = e.target.nodeName.toLowerCase();
      if (this.stopPropagationElements.includes(targetNodeName)) {
        e.stopPropagation();
        return;
      }

      this.$emit('close', e);
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
