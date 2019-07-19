<template>
  <div
    class="v-card"
    :class="themeCssClass"
  >
    <slot />
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VCard',
  mixins: [ThemeMixin],
};
</script>
