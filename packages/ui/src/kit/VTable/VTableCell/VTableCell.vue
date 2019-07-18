<template>
  <td :class="vTableCellCssClass">
    <slot />
  </td>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VTableCell',
  computed: {
    vTableCellCssClass() {
      return Object.assign(this.themeCssClass, {
        'v-table-cell': true,
      });
    },
  },
  mixins: [ThemeMixin],
};
</script>
