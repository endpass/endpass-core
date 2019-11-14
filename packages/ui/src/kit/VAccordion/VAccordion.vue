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
  props: {
    className: {
      type: String,
      default: null,
    },
  },
  computed: {
    vAccordionCssClass() {
      return Object.assign(this.themeCssClass, {
        'v-accordion': true,
        [this.className]: this.className || false,
      });
    },
  },
  mixins: [ThemeMixin],
};
</script>
