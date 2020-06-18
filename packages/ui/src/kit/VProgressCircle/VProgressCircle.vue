<template>
  <field-atom
    :class="themeCssClass"
    :style="sizeStyle"
  >
    <svg
      class="v-progress-circle-back"
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
      class="v-progress-circle-over"
      :style="{ ...sizeStyle, strokeDasharray }"
    >
      <circle
        :r="circleAttrs.r"
        :cx="circleAttrs.cx"
        :cy="circleAttrs.cy"
        :stroke="circleAttrs.stroke"
        :stroke-width="lineThickness"
      />
    </svg>
    <span
      v-if="isShowProgress"
      class="v-progress-circle-text"
    >
      {{ progressText }}
    </span>
  </field-atom>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import FieldAtom from '@/atom/field-atom/field-atom';

// For initial state progress must show `action` like something is processing.
// But if progress have `0` value, circle will be static and '0%' title.
// Soo default behavior is always show animated circle without label
// and if progress more than `1`, show progress title
const MIN_PROGRESS_VALUE = 1;
const DEFAULT_VIEW_VALUE = 2;
const MAX_VALUE = 100;

export default {
  name: 'VProgressCircle',

  props: {
    progress: {
      type: [Number, String],
      default: 0,
    },

    animated: {
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

    isLabelVisible: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    themeCssClass() {
      return {
        'v-progress-circle': true,
        animated: this.animated,
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
      const { radius, progressValue } = this;
      const circmference = radius * 2 * Math.PI;

      return `${(circmference / 100) * progressValue} ${circmference}`;
    },

    progressText() {
      return `${this.progress}%`;
    },

    progressValue() {
      if (this.progress <= MIN_PROGRESS_VALUE) {
        return DEFAULT_VIEW_VALUE;
      }

      if (this.progress >= MAX_VALUE - MIN_PROGRESS_VALUE) {
        return MAX_VALUE - DEFAULT_VIEW_VALUE;
      }

      return this.progress;
    },

    isShowProgress() {
      return this.isLabelVisible && this.progress >= MIN_PROGRESS_VALUE;
    },
  },

  mixins: [ThemeMixin],

  components: {
    FieldAtom,
  },
};
</script>
