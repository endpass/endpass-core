<template>
  <field-atom
    class="v-progress-circle"
    :class="progressCircleCssClass"
  >
    <svg class="v-progress-circle-back">
      <circle
        :r="circleProps.r"
        :cx="circleProps.cx"
        :cy="circleProps.cy"
        :stroke-width="circleProps.thickness"
        :width="circleProps.size"
        :height="circleProps.size"
      />
    </svg>
    <svg
      class="v-progress-circle-over"
      :style="{ strokeDasharray: strokeDasharray }"
    >
      <circle
        :r="circleProps.r"
        :cx="circleProps.cx"
        :cy="circleProps.cy"
        :stroke="$options.STROKE_COLOR"
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

const SIZE_DEFAULT_STROKE = 188.4;

// For initial state progress must show `action` like something is processing.
// But if progress have `0` value, circle will be static and '0%' title.
// Soo default behavior is always show animated circle without label
// and if progress more than `1`, show progress title
const MIN_PROGRESS_VALUE = 1;
const DEFAULT_VIEW_VALUE = 2;
const MAX_VALUE = 100;

const CIRCLE_PROPS_NORMAL = {
  r: 30,
  cx: 41,
  cy: 41,
  thickness: 4,
};
const CIRCLE_PROPS_SMALL = {
  r: 6,
  cx: 8.15,
  cy: 8.15,
  thickness: 2,
};

const STROKE_COLOR = '#6e32c9';

export default {
  name: 'VProgressCircle',

  STROKE_COLOR,

  props: {
    progress: {
      type: [Number, String],
      default: 0,
    },

    isLabelVisible: {
      type: Boolean,
      default: false,
    },

    size: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'small'].indexOf(value) !== -1;
      },
    },
  },

  computed: {
    progressCircleCssClass() {
      return {
        ...this.themeCssClass,
        [`size-${this.size}`]: true,
      };
    },

    circleProps() {
      switch (this.size) {
        case 'small':
          return CIRCLE_PROPS_SMALL;

        case 'normal':
        default:
          return CIRCLE_PROPS_NORMAL;
      }
    },

    strokeDasharray() {
      const toStroke = Math.floor(
        (this.progressValue - 0) * (SIZE_DEFAULT_STROKE / 100),
      );

      return `${toStroke}, ${SIZE_DEFAULT_STROKE}`;
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
      return (
        this.size !== 'small' &&
        this.isLabelVisible &&
        this.progress >= MIN_PROGRESS_VALUE
      );
    },
  },

  mixins: [ThemeMixin],

  components: {
    FieldAtom,
  },
};
</script>
