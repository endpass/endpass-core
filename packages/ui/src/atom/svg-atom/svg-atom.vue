<template>
  <svg
    class="v-svg-atom"
    :class="themeCssClass"
    xmlns="http://www.w3.org/2000/svg"
  >
    <use :xlink:href="url" />
  </svg>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'SvgAtom',
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  mixins: [ThemeMixin],
};
</script>
