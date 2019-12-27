<template>
  <div :class="vTabsCssClass">
    <section class="v-tabs-controls-list">
      <button
        v-for="(child, index) in $slots.default.filter($el => !!$el.tag)"
        :key="index"
        :class="{
          'v-tabs-control': true,
          'is-active': activeTabId === getChildProps(child).id,
        }"
        v-bind="child.data.attrs"
        @click="onTabClick($event, index)"
      >
        {{ getChildProps(child).label }}
      </button>
    </section>
    <section class="v-tabs-content">
      <slot />
    </section>
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VTabs',

  provide() {
    return {
      addTab: this.addTab,
      removeTab: this.removeTab,
    };
  },

  props: {
    initialTab: {
      type: String,
      default: null,
    },
  },

  data: () => ({
    activeTabId: null,
    tabs: [],
  }),

  computed: {
    vTabsCssClass() {
      return { ...this.themeCssClass, 'v-tabs': true };
    },
  },

  methods: {
    getChildProps(child) {
      return child.componentOptions.propsData || {};
    },

    addTab(tab) {
      this.tabs.push(tab);
    },

    removeTab(tab) {
      const tabIdx = this.tabs.indexOf(tab);

      if (tabIdx === -1) return;

      this.tabs.splice(tabIdx, 1);
    },

    onTabClick(ev, index) {
      const targetTab = this.tabs[index];
      const { id } = targetTab.$options.propsData;

      this.activeTabId = id;
      targetTab.$emit('click');
    },
  },

  mounted() {
    if (this.initialTab) {
      this.activeTabId = this.initialTab;
      return;
    }

    const [firstTab] = this.$slots.default.filter($el => !!$el.tag);

    this.activeTabId = this.getChildProps(firstTab).id;
  },

  mixins: [ThemeMixin],
};
</script>
