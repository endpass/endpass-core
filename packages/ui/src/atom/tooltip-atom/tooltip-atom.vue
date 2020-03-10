<template>
  <transition name="tooltip-atom-fade">
    <div
      v-show="show"
      class="tooltip-atom"
      :class="tagCssClass"
      v-bind="$attrs"
    >
      <div class="tooltip-atom-container">
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
  },

  computed: {
    tagCssClass() {
      return {
        ...this.themeCssClass,
        [`position-${this.position}`]: true,
      };
    },
  },

  mixins: [ThemeMixin],
};
</script>
