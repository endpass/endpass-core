<template>
  <svg
    :class="svgAtomCssClass"
    :width="width"
    :height="height"
    class="svg-atom"
  >
    <use
      x="0"
      y="0"
      :xlink:href="iconId"
    />
  </svg>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'SvgAtom',

  props: {
    width: {
      type: String,
      default: '100%',
    },

    height: {
      type: String,
      default: '100%',
    },

    name: {
      type: String,
      required: true,
    },
  },

  computed: {
    svgAtomCssClass() {
      return Object.assign(this.themeCssClass, {});
    },

    iconId() {
      return `#endpass-ui-icon-${this.name}`;
    },
  },

  mixins: [ThemeMixin],
};
</script>
