<template>
  <section :class="vSuperMenuSectionCssClass">
    <p
      v-if="label"
      class="v-super-menu-section-label"
    >
      {{ label }}
    </p>
    <slot />
  </section>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VSuperMenuSection',

  props: {
    label: {
      type: String,
      default: null,
    },
  },

  computed: {
    vSuperMenuSectionCssClass() {
      return Object.assign({}, this.themeCssClass, {
        'v-super-menu-section': true,
      });
    },
  },

  mixins: [ThemeMixin],
};
</script>
