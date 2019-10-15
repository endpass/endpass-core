<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VTabs',

  provide() {
    return {
      addTab: this.addTab,
    };
  },

  data: () => ({
    activeTabIdx: 0,
    tabs: [],
  }),

  computed: {
    vTabsCssClass() {
      return { ...this.themeCssClass, 'v-tabs': true };
    },
  },

  methods: {
    addTab(tab) {
      this.tabs = this.tabs.concat(tab);
    },
  },

  mounted() {
    this.addTab = this.addTab.bind(this);
  },

  mixins: [ThemeMixin],

  renderHeader(h, ctx) {
    const controls = ctx.$slots.default
      .filter($el => !!$el.tag)
      .map(($el, i) => {
        const componentProps = $el.componentOptions.propsData || {};

        return h(
          'button',
          {
            class: {
              'v-tabs-control': true,
              'is-active': ctx.activeTabIdx === i,
            },
            on: {
              click() {
                if (ctx.activeTabIdx === i) return;

                // eslint-disable-next-line
                ctx.activeTabIdx = i;
              },
            },
          },
          componentProps.label,
        );
      });

    return h(
      'section',
      {
        class: 'v-tabs-controls',
      },
      controls,
    );
  },

  renderContent(h, ctx) {
    const targetTab = ctx.tabs[ctx.activeTabIdx];

    if (!targetTab) return null;

    return h(
      'section',
      {
        class: 'v-tabs-content',
      },
      targetTab.$slots.default,
    );
  },

  render(h) {
    const isTabsExists = this.$slots.default.length > 0;

    return h(
      'div',
      {
        class: this.vTabsCssClass,
      },
      isTabsExists && [
        this.$slots.default,
        this.$options.renderHeader(h, this),
        this.$options.renderContent(h, this),
      ],
    );
  },
};
</script>
