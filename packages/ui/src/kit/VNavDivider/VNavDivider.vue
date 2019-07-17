<template>
  <div
    :class="vNavDividerCssClass"
    class="v-nav-divider"
  />
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VNavDivider',

  computed: {
    vNavDividerCssClass() {
      return Object.assign(this.themeCssClass, {});
    },
  },

  mixins: [ThemeMixin],
};
</script>
