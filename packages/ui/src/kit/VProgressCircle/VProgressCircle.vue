<template>
  <field-atom
    class="v-progress-circle"
    :class="themeCssClass"
  >
    <svg class="v-progress-circle-back">
      <circle
        :r="$options.CIRCLE_PROPS.r"
        :cx="$options.CIRCLE_PROPS.cx"
        :cy="$options.CIRCLE_PROPS.cy"
        :stroke-width="lineThickness"
      />
    </svg>
    <svg
      class="v-progress-circle-over"
      :style="{ strokeDasharray: strokeDasharray }"
    >
      <circle
        :r="$options.CIRCLE_PROPS.r"
        :cx="$options.CIRCLE_PROPS.cx"
        :cy="$options.CIRCLE_PROPS.cy"
        :stroke="$options.CIRCLE_PROPS.stroke"
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

const CIRCLE_PROPS = {
  r: '30px',
  cx: '41px',
  cy: '41px',
  stroke: '#6e32c9',
};

export default {
  name: 'VProgressCircle',

  CIRCLE_PROPS,

  props: {
    progress: {
      type: [Number, String],
      default: 0,
    },

    isLabelVisible: {
      type: Boolean,
      default: false,
    },

    lineThickness: {
      type: [Number, String],
      default: 4,
    },
  },

  computed: {
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
      return this.isLabelVisible && this.progress >= MIN_PROGRESS_VALUE;
    },
  },

  mixins: [ThemeMixin],

  components: {
    FieldAtom,
  },
};
</script>
