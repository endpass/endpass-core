<template>
  <svg
    class="svg-atom"
    :class="themeCssClass"
    xmlns="http://www.w3.org/2000/svg"
  >
    <use :xlink:href="href" />
  </svg>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'SvgAtom',
  props: {
    href: {
      type: String,
      required: true,
    },
  },
  mixins: [ThemeMixin],
};
</script>
