<template>
  <tbody :class="vTableTbodyCssClass">
    <slot />
  </tbody>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VTableTbody',
  computed: {
    vTableTbodyCssClass() {
      return Object.assign(this.themeCssClass, {
        'v-table-tbody': true,
      });
    },
  },
  mixins: [ThemeMixin],
};
</script>
