<template>
  <div :class="accordionClassName">
    <slot />
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VAccordion',

  props: {
    classNames: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    accordionClassName() {
      return `accordion ${this.classNames.accordion || ''}`;
    },
  },

  mixins: [ThemeMixin],
};
</script>
