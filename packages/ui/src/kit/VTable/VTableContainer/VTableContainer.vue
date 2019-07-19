<template>
  <div
    class="v-table-container"
    :class="themeCssClass"
  >
    <slot />
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VTableContainer',
  mixins: [ThemeMixin],
};
</script>
