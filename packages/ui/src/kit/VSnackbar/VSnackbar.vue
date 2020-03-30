<template>
  <div
    class="v-snackbar"
    :class="cssClasses"
  >
    <div class="v-snackbar-container">
      <svg-atom
        v-if="icon"
        class="v-snackbar-icon"
        :name="icon"
      />
      <div class="v-snackbar-content">
        <slot />
      </div>
      <div
        v-if="!isMultiLine"
        class="v-snackbar-controls"
      >
        <slot name="control" />
      </div>
      <div class="v-snackbar-close">
        <button
          class="v-snackbar-close-button"
          @click="onClose"
        >
          <svg-atom
            name="close"
            width="10px"
            height="10px"
          />
        </button>
      </div>
    </div>
    <div
      v-if="isMultiLine"
      class="v-snackbar-controls"
    >
      <slot name="control" />
    </div>
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import SvgAtom from '@/atom/svg-atom/svg-atom';

const ICONS_BY_SKIN = {
  warning: 'circle-warning',
  error: 'circle-minus',
  success: 'circle-mark',
  time: 'circle-time',
};

export default {
  name: 'VSnackbar',

  props: {
    skin: {
      type: String,
      default: 'none',
      validator(value) {
        return ['none', 'warning', 'error', 'success', 'time'].includes(value);
      },
    },

    isMultiLine: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    icon() {
      return ICONS_BY_SKIN[this.skin];
    },

    cssClasses() {
      return {
        ...this.themeCssClass,
        'is-multiline': this.isMultiLine,
        [`skin-${this.skin}`]: true,
      };
    },
  },

  methods: {
    onClose() {
      this.$emit('close');
    },
  },

  mixins: [ThemeMixin],

  components: { SvgAtom },
};
</script>
