<template>
  <tbody :class="vTableBodyCssClass">
    <slot />
  </tbody>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VTableBody',
  computed: {
    vTableBodyCssClass() {
      return Object.assign(this.themeCssClass, {
        'v-table-body': true,
      });
    },
  },
  mixins: [ThemeMixin],
};
</script>
