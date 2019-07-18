<template>
  <thead :class="vTableTheadCssClass">
    <slot />
  </thead>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VTableThead',
  computed: {
    vTableTheadCssClass() {
      return Object.assign(this.themeCssClass, {
        'v-table-thead': true,
      });
    },
  },
  mixins: [ThemeMixin],
};
</script>
