<template>
  <field-atom
    :class="themeCssClass"
    :style="sizeStyle"
  >
    <svg
      class="circular-loader-atom-back"
      :style="sizeStyle"
    >
      <circle
        :r="circleAttrs.r"
        :cx="circleAttrs.cx"
        :cy="circleAttrs.cy"
        :stroke-width="lineThickness"
      />
    </svg>
    <svg
      class="circular-loader-atom-over"
      :style="{ ...sizeStyle, strokeDasharray, stroke: circleAttrs.stroke }"
    >
      <circle
        :r="circleAttrs.r"
        :cx="circleAttrs.cx"
        :cy="circleAttrs.cy"
        :stroke-width="lineThickness"
      />
    </svg>
    <slot />
  </field-atom>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import FieldAtom from '@/atom/field-atom/field-atom';

export default {
  name: 'CircularLoaderAtom',

  props: {
    progress: {
      type: [Number, String],
      default: 0,
    },

    isAnimated: {
      type: Boolean,
      default: true,
    },

    size: {
      type: [Number, String],
      default: 82,
    },

    stroke: {
      type: String,
      default: '#6e32c9',
    },

    lineThickness: {
      type: [Number, String],
      default: 4,
    },
  },

  computed: {
    themeCssClass() {
      return {
        'circular-loader-atom': true,
        animated: this.isAnimated,
      };
    },

    sizeStyle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
      };
    },

    radius() {
      return this.size / 2 - this.lineThickness / 2;
    },

    circleAttrs() {
      const { size, radius, stroke } = this;

      return {
        r: radius,
        cx: `${size / 2}px`,
        cy: `${size / 2}px`,
        stroke,
      };
    },

    strokeDasharray() {
      const { radius, progress } = this;
      const circumference = radius * 2 * Math.PI;

      return `${(circumference / 100) * progress} ${circumference}`;
    },
  },

  mixins: [ThemeMixin],

  components: {
    FieldAtom,
  },
};
</script>
