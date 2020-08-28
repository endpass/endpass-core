<template>
  <field-atom
    :class="themeCssClass"
    :style="sizeStyle"
  >
    <svg
      class="circular-loader-atom-back"
      :style="{ ...sizeStyle, fill: 'none', 'stroke-width': lineThickness }"
    >
      <path
        :d="
          describeArc(
            circleAttrs.cx,
            circleAttrs.cy,
            circleAttrs.r,
            startAngle,
            endAngle,
          )
        "
      />
    </svg>
    <svg
      class="circular-loader-atom-over"
      :style="{
        ...sizeStyle,
        stroke: circleAttrs.stroke,
        fill: 'none',
        'stroke-width': lineThickness,
      }"
    >
      <path
        :d="
          describeArc(
            circleAttrs.cx,
            circleAttrs.cy,
            circleAttrs.r,
            startAngle,
            progressAngle,
          )
        "
      />
    </svg>
    <slot />
  </field-atom>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import FieldAtom from '@/atom/field-atom/field-atom';

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

export default {
  name: 'CircularLoaderAtom',

  props: {
    progress: {
      type: [Number, String],
      default: 0,
    },

    startAngle: {
      type: Number,
      default: 0,
    },

    endAngle: {
      type: Number,
      default: 359.9,
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
    progressAngle() {
      return (
        this.startAngle +
        (Number(this.progress) * (this.endAngle - this.startAngle)) / 100 -
        0.1
      );
    },

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
        cx: size / 2,
        cy: size / 2,
        stroke,
      };
    },
  },

  methods: {
    describeArc(x, y, radius, startAngle, endAngle) {
      const start = polarToCartesian(x, y, radius, endAngle);
      const end = polarToCartesian(x, y, radius, startAngle);

      const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

      const d = [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y,
      ].join(' ');

      return d;
    },
  },

  mixins: [ThemeMixin],

  components: {
    FieldAtom,
  },
};
</script>
