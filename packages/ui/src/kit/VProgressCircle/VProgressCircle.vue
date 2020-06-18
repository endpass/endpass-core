<template>
  <circular-loader-atom
    :class="themeCssClass"
    :progress="progress"
    :line-thickness="lineThickness"
  >
    <span
      v-if="isShowProgress"
      class="v-progress-circle-text"
    >
      {{ progressText }}
    </span>
  </circular-loader-atom>
</template>

<script>
import CircularLoaderAtom from '@/atom/circular-loader-atom/circular-loader-atom';
import ThemeMixin from '@/mixins/ThemeMixin';

// For initial state progress must show `action` like something is processing.
// But if progress have `0` value, circle will be static and '0%' title.
// Soo default behavior is always show animated circle without label
// and if progress more than `1`, show progress title
const MIN_PROGRESS_VALUE = 1;

export default {
  name: 'VProgressCircle',

  props: {
    progress: {
      type: [Number, String],
      default: 0,
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

    progressText() {
      return `${this.progress}%`;
    },

    isShowProgress() {
      return this.isLabelVisible && this.progress > MIN_PROGRESS_VALUE;
    },
  },

  mixins: [ThemeMixin],

  components: {
    CircularLoaderAtom,
  },
};
</script>
