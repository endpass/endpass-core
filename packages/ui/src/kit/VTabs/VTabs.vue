<template>
  <div :class="vTabsCssClass">
    <section class="v-tabs-controls">
      <slot />
    </section>
    <section class="v-tabs-content">
      <slot name="content" />
    </section>
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VTabs',

  props: {
    activeTab: {
      type: String,
      default: null,
    },
  },

  computed: {
    vTabsCssClass() {
      return { ...this.themeCssClass, 'v-tabs': true,};
    },
  },

  mixins: [ThemeMixin],
};
</script>
