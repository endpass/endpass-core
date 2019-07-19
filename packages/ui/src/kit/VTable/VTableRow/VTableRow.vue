<template>
  <tr
    :class="vTableRowCssClass"
    class="v-table-row"
    v-on="$listeners"
  >
    <slot />
  </tr>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VTableRow',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    vTableRowCssClass() {
      return Object.assign(this.themeCssClass, {
        'is-active': this.isActive,
      });
    },
  },
  mixins: [ThemeMixin],
};
</script>
