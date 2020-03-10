<template>
  <header
    :class="vHeaderCssClass"
    class="v-header"
  >
    <slot />
  </header>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VHeader',

  props: {
    skin: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary'].includes(value);
      },
    },
  },

  computed: {
    vHeaderCssClass() {
      return Object.assign(this.themeCssClass, {
        [`skin-${this.skin}`]: !!this.skin,
      });
    },
  },

  mixins: [ThemeMixin],
};
</script>
