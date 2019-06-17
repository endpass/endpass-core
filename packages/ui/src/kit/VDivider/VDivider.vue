<template>
  <div
    class="v-divider"
    :class="themeCssClass"
  >
    <hr class="v-divider-before">
    <span
      v-if="$slots.default"
      class="v-divider-text"
    >
      <slot />
    </span>
    <hr class="v-divider-after">
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VDivider',
  mixins: [ThemeMixin],
};
</script>
