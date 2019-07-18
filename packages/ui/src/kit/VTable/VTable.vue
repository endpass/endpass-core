<template>
  <table :class="vTableCssClass">
    <slot />
  </table>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VTable',
  props: {
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    vTableCssClass() {
      return Object.assign(this.themeCssClass, {
        'v-table': true,
        'v-table-fixed': this.fixed,
      });
    },
  },
  mixins: [ThemeMixin],
};
</script>
