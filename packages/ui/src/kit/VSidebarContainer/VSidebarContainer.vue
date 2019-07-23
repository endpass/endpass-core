<template>
  <div
    class="v-sidebar-container"
    :class="themeCssClass"
  >
    <div class="v-sidebar-container-wrapper">
      <slot />
    </div>
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VSidebarContainer',
  mixins: [ThemeMixin],
};
</script>
