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
    };
  },

  data: () => ({
    activeTabIdx: null,
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
    },

    removeTab(tab) {
      this.tabs.splice(
        this.tabs.findIndex(el => el === tab),
        1,
      );
    },

    handleTabsMount() {
      if (!this.$slots.default) return;

      const tabs = this.$slots.default.filter($el => !!$el.tag);
      const activeTab = tabs.find(
        tab => tab.componentOptions.propsData.isActive,
      );

      if (!activeTab) return;

      const activeTabIdx = tabs.findIndex(tab => tab === activeTab);

      this.activeTabIdx = activeTabIdx;
    },

    handleTabsRender() {
      if (!this.$slots.default) return;

      const tabs = this.$slots.default.filter($el => !!$el.tag);

      if (tabs.length === 0) return;

      if (this.activeTabIdx !== null) return;

      this.activeTabIdx = 0;
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

  updated() {
    this.handleTabsRender();
  },

  mounted() {
    this.handleTabsRender();
    this.handleTabsMount();
  },

  mixins: [ThemeMixin],

  components: {
    VTabsContent,
  },
};
</script>
