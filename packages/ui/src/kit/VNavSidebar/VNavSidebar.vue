<template>
  <div :class="vNavSidebarCssClass">
    <aside class="v-nav-sidebar-aside">
      <slot />
    </aside>
    <div class="v-nav-sidebar-overlay" />
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VNavSidebar',

  computed: {
    vNavSidebarCssClass() {
      return Object.assign(this.themeCssClass, {
        'v-nav-sidebar': true,
      });
    },
  },

  mixins: [ThemeMixin],
};
</script>
