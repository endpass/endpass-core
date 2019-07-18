<template>
  <tr :class="vTableRowCssClass">
    <slot />
  </tr>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VTableRow',
  computed: {
    vTableRowCssClass() {
      return Object.assign(this.themeCssClass, {
        'v-table-row': true,
      });
    },
  },
  mixins: [ThemeMixin],
};
</script>
