<template>
  <div
    class="v-sidebar-panel"
    :class="themeCssClass"
  >
    <slot />
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VSidebarPanel',
  mixins: [ThemeMixin],
};
</script>
