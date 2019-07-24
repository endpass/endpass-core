<template>
  <button
    :class="vButtonCssClass"
    class="v-button"
    v-on="$listeners"
  >

    <icon-atom
      v-if="isLoading"
      class="v-button-icon v-button-icon-loader"
    >
      <v-svg-icon name="loader"></v-svg-icon>
    </icon-atom>
    <icon-atom
      v-if="$slots.iconBefore && !isLoading"
      class="v-button-icon icon-before"
    >
      <slot name="iconBefore" />
    </icon-atom>
    <span class="v-button-label"
      v-if="!isLoading">
      <slot />
    </span>
    <icon-atom
      v-if="$slots.iconAfter && !isLoading"
      class="v-button-icon icon-after"
    >
      <slot name="iconAfter" />
    </icon-atom>
  </button>
</template>

<script>
import IconAtom from '@/atom/icon-atom/icon-atom';
import VSvgIcon from '@/kit/VSvgIcon';
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VButton',
  props: {
    skin: {
      type: String,
      default: 'primary',
      validator(value) {
        return (
          [
            'primary',
            'secondary',
            'tertiary',
            'quaternary',
            'ghost',
            'social',
            'success',
            'error',
            'quaternary-error',
          ].indexOf(value) !== -1
        );
      },
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'big'].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    vButtonCssClass() {
      return Object.assign({}, this.themeCssClass, {
        [`skin-${this.skin}`]: true,
        [`size-${this.size}`]: true,
      });
    },
  },
  mixins: [ThemeMixin],
  components: { IconAtom, VSvgIcon },
};
</script>
