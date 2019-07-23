<template>
  <div
    :class="vIndicatorCssClass"
    class="v-indicator"
  >
    <span class="v-indicator-dot" />
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VIndicator',

  props: {
    status: {
      type: String,
      default: 'ok',
      validator(value) {
        return ['ok', 'error'].indexOf(value) !== -1;
      },
    },
  },

  computed: {
    vIndicatorCssClass() {
      return Object.assign({}, this.themeCssClass, {
        [`status-${this.status}`]: true,
      });
    },
  },

  mixins: [ThemeMixin],
};
</script>
