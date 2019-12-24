<template>
  <div
    class="v-accordion"
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
    size: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['small', 'normal', 'large'].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    vAccordionCssClass() {
      return {
        ...this.themeCssClass,
        [`size-${this.size}`]: true,
      };
    },
  },
  mixins: [ThemeMixin],
};
</script>
