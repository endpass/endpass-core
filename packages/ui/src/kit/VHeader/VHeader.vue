<template>
  <header
    :class="vHeaderCssClass"
    class="v-header"
  >
    <slot />
  </header>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VHeader',

  computed: {
    vHeaderCssClass() {
      return Object.assign(this.themeCssClass, {});
    },
  },

  mixins: [ThemeMixin],
};
</script>
