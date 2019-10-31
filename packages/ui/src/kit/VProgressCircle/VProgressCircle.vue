<template>
  <field-atom
    class="v-progress-circle"
    :class="themeCssClass"
  >
    <svg class="v-progress-circle-back">
      <circle
        :r="r"
        :cx="cx"
        :cy="cy"
      />
    </svg>
    <svg
      class="v-progress-circle-over"
      :style="{ strokeDasharray: strokeDasharray }"
    >
      <circle
        :r="r"
        :cx="cx"
        :cy="cy"
        :stroke="stroke"
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

export default {
  name: 'VProgressCircle',

  props: {
    progress: {
      type: [Number, String],
      default: 0,
    },
    isLabelVisible: {
      type: Boolean,
      default: false,
    },
    r: {
      type: String,
      default: '30px',
    },
    cx: {
      type: String,
      default: '41px',
    },
    cy: {
      type: String,
      default: '41px',
    },
    stroke: {
      type: String,
      default: '#6e32c9',
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
