<template>
  <i
    class="icon-atom"
    :class="iconAtomCssClass"
  >
    <slot />
  </i>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'IconAtom',
  computed: {
    iconAtomCssClass() {
      return Object.assign(this.themeCssClass, {
        'is-error': this.$attrs['is-error'],
      });
    },
  },
  mixins: [ThemeMixin],
};
</script>
