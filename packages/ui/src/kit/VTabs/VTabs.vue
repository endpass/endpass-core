<template>
  <div
    v-if="$slots.default"
    :class="vTabsCssClass"
  >
    <section class="v-tabs-controls-list">
      <button
        v-for="(tab, index) in $slots.default.filter($el => !!$el.tag)"
        :key="index"
        :class="{
          'v-tabs-control': true,
          'is-active': activeTabIdx === index,
        }"
        v-bind="tab.data.attrs"
        @click="onTabClick({ event: $event, index })"
      >
        {{ getTabLabel(tab) }}
      </button>
    </section>
    <div v-show="false">
      <slot />
    </div>
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
import VTabsContent from './VTabsContent.vue';

export default {
  name: 'VTabs',

  provide() {
    return {
      addTab: this.addTab,
      removeTab: this.removeTab,
      setTabAsActive: this.setTabAsActive,
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
      this.tabs.push(tab);

      if (!tab.$props.isActive) return;

      this.activeTabIdx = this.tabs.findIndex(el => el === tab);
    },

    removeTab(tab) {
      const tabIdx = this.tabs.findIndex(el => el === tab);

      this.tabs.splice(tabIdx, 1);

      const newTabIdx = this.activeTabIdx - 1;

      this.activeTabIdx = newTabIdx >= 0 ? newTabIdx : 0;
    },

    setTabAsActive(tab) {
      const tabIdx = this.tabs.findIndex(el => el === tab);

      if (this.activeTabIdx === tabIdx) return;

      this.activeTabIdx = tabIdx;
    },

    getTabLabel(tab) {
      const { data, componentOptions } = tab;

      if (componentOptions.propsData && componentOptions.propsData.label) {
        return componentOptions.propsData.label;
      }

      return data.attrs.label;
    },

    onTabClick({ event, index }) {
      const { $listeners = {} } = this.tabs[index];

      this.activeTabIdx = index;

      if (!$listeners.click) return;

      $listeners.click(event);
    },
  },

  mixins: [ThemeMixin],

  components: {
    VTabsContent,
  },
};
</script>
