<script>
export default {
  props: {
    activeTabIdx: {
      type: Number,
      default: null,
    },
  },

  render(h) {
    const { $slots, activeTabIdx } = this;

    if (activeTabIdx === null) return null;

    const tabs = $slots.default.filter($el => !!$el.tag);
    const targetTab = tabs[activeTabIdx];

    if (!targetTab) return null;

    return h(
      'section',
      {
        class: 'v-tabs-content',
      },
      targetTab.componentOptions.children,
    );
  },
};
</script>
