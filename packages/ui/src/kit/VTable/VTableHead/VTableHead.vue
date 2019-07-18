<template>
  <th :class="vTableHeadCssClass">
    <slot />
  </th>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VTableHead',
  computed: {
    vTableHeadCssClass() {
      return Object.assign(this.themeCssClass, {
        'v-table-head': true,
      });
    },
  },
  mixins: [ThemeMixin],
};
</script>
