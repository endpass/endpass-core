<template>
  <th :class="vTableHeadCellCssClass">
    <slot />
  </th>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VTableHeadCell',
  computed: {
    vTableHeadCellCssClass() {
      return Object.assign(this.themeCssClass, {
        'v-table-head-cell': true,
      });
    },
  },
  mixins: [ThemeMixin],
};
</script>
