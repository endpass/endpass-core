<template>
  <div
    v-if="$slots.default"
    :class="vTabsCssClass"
  >
    <section class="v-tabs-controls-list">
      <button
        v-for="(child, index) in $slots.default.filter($el => !!$el.tag)"
        :key="index"
        :class="{
          'v-tabs-control': true,
          'is-active': activeTabIdx === index,
        }"
        v-bind="child.data.attrs"
        @click="onTabClick({ event: $event, index, tab: child })"
      >
        {{ getChildProps(child).label }}
      </button>
    </section>
    <v-tabs-content
      class="v-tabs-content"
      :active-tab-idx="activeTabIdx"
    >
      <slot />
    </v-tabs-content>
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import VTabsContent from './VTabsContent';

export default {
  name: 'VTabs',

  data: () => ({
    activeTabIdx: null,
  }),

  computed: {
    vTabsCssClass() {
      return { ...this.themeCssClass, 'v-tabs': true };
    },
  },

  methods: {
    handleTabsChange() {
      if (!this.$slots.default) return;

      const tabs = this.$slots.default.filter($el => !!$el.tag);

      if (tabs.length === 0) return;

      if (this.activeTabIdx !== null) return;

      this.activeTabIdx = 0;
    },

    getChildProps(child) {
      return child.componentOptions.propsData || {};
    },

    onTabClick({ event, index, tab }) {
      const { listeners } = tab.componentOptions;

      this.activeTabIdx = index;

      if (!listeners || !listeners.click) return;

      listeners.click(event);
    },
  },

  updated() {
    this.handleTabsChange();
  },

  mounted() {
    this.handleTabsChange();
  },

  mixins: [ThemeMixin],

  components: {
    VTabsContent,
  },
};
</script>
