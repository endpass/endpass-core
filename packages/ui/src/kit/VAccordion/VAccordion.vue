<template>
  <div
    :class="vAccordionCssClass"
  >
    <slot />
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VAccordion',
  computed: {
    vAccordionCssClass() {
      return Object.assign(this.themeCssClass, {
        'v-accordion': true,
      });
    },
  },
  mixins: [ThemeMixin],
};
</script>
