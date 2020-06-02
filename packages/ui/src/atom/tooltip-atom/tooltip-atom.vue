<template>
  <transition name="tooltip-atom-fade">
    <div
      v-show="show"
      class="tooltip-atom"
      :class="tooltipCssClass"
      v-bind="$attrs"
    >
      <div
        class="tooltip-atom-container"
        :style="tooltipContainerStyles"
      >
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'TooltipAtom',

  inheritAttrs: false,

  props: {
    show: {
      type: Boolean,
      default: false,
    },

    position: {
      type: String,
      default: 'top-left',
      validator(value) {
        return [
          'top-left',
          'top-right',
          'bottom-left',
          'bottom-right',
        ].includes(value);
      },
    },

    width: {
      type: Number,
      default: 172,
    },
  },

  computed: {
    tooltipCssClass() {
      return {
        ...this.themeCssClass,
        [`position-${this.position}`]: true,
      };
    },

    tooltipContainerStyles() {
      return {
        'min-width': `${this.width}px`,
      };
    },
  },

  mixins: [ThemeMixin],
};
</script>
