<template>
  <div :class="vTabsCssClass">
    <slot />
    <section
      v-if="isTabsExists"
      class="v-tabs-controls-list"
    >
      <button
        v-for="(child, index) in tabsLabels"
        :key="index"
        :class="{
          'v-tabs-control': true,
          'is-active': activeTabIdx === index,
        }"
        v-bind="child.data.attrs"
        @click="onTabClick($event, index)"
      >
        {{ getChildLabel(child) }}
      </button>
    </section>
    <section
      v-if="activeContent"
      class="v-tabs-content"
    >
      <v-tab-content v-bind="{ content: activeContent }" />
    </section>
  </div>
</template>
<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import VTabContent from '@/kit/VTabs/VTabContent';

export default {
  name: 'VTabs',
  provide() {
    return {
      addTab: this.addTab,
      removeTab: this.removeTab,
      setActive: this.setActive,
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
    tabsLabels() {
      return this.$slots.default.filter($el => !!$el.tag);
    },
    isTabsExists() {
      return this.$slots.default.length > 0;
    },
    activeContent() {
      const child = this.tabs[this.activeTabIdx];
      if (!child) {
        return null;
      }

      return child.$slots.default;
    },
  },

  methods: {
    getChildLabel(child) {
      const props = child.componentOptions.propsData || {};
      return props.label;
    },

    addTab(tab) {
      this.tabs = this.tabs.concat(tab);
    },

    setActive(tab) {
      const tabIdx = this.tabs.indexOf(tab);
      if (tabIdx === -1) return;

      this.activeTabIdx = tabIdx;
    },

    removeTab(tab) {
      const tabIdx = this.tabs.indexOf(tab);
      if (tabIdx === -1) return;

      this.tabs.splice(tabIdx, 1);
    },

    onTabClick(ev, index) {
      if (this.activeTabIdx === index) return;

      this.activeTabIdx = index;
      const child = this.tabs[index];
      if (child) {
        child.$emit('click', ev);
      }
    },
  },

  mixins: [ThemeMixin],
  components: { VTabContent },
};
</script>
