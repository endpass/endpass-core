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

    return h(
      'section',
      {
        class: 'v-tabs-content',
      },
      tabs.map((tabSlot, index) => h(
        'div',
        {
          directives: [
            {
              name: 'show',
              value: index === activeTabIdx,
            },
          ],
        },
        [tabSlot],
      )),
    );
  },
};
</script>
