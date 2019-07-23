<template>
  <thead :class="vTableHeadCssClass">
    <slot />
  </thead>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VTableHead',
  props: {
    skin: {
      type: String,
      default: 'grey',
      validator(value) {
        return ['grey', 'none'].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    vTableHeadCssClass() {
      return Object.assign({}, this.themeCssClass, {
        'v-table-head': true,
        [`skin-${this.skin}`]: true,
      });
    },
  },
  mixins: [ThemeMixin],
};
</script>
