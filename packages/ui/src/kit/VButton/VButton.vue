<template>
  <button
    :class="vButtonCssClass"
    class="v-button"
    v-on="$listeners"
  >
    <icon-atom
      v-if="$slots.iconBefore && isSocialIcon && isLoading"
      class="v-button-icon icon-before"
    >
      <button-loader-atom />
    </icon-atom>
    <icon-atom
      v-if="$slots.iconBefore && !isLoading"
      class="v-button-icon icon-before"
    >
      <slot name="iconBefore" />
    </icon-atom>
    <span
      v-if="!isLoading || isSocialIcon"
      class="v-button-label"
    >
      <slot />
    </span>

    <icon-atom
      v-if="!isSocialIcon && isLoading"
      class="v-button-icon"
    >
      <button-loader-atom />
    </icon-atom>
    <icon-atom
      v-if="$slots.iconAfter && isSocialIcon && isLoading"
      class="v-button-icon icon-after"
    >
      <button-loader-atom />
    </icon-atom>
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
import ThemeMixin from '@/mixins/ThemeMixin';
import ButtonLoaderAtom from '@/atom/button-loader-atom/button-loader-atom';

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
            'quaternary-primary',
          ].indexOf(value) !== -1
        );
      },
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isInline: {
      type: Boolean,
      default: false,
    },
    isBorderless: {
      type: Boolean,
      default: false,
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
      return {
        ...this.themeCssClass,
        [`skin-${this.skin}`]: true,
        [`size-${this.size}`]: true,
        'is-inline': this.isInline,
        'is-borderless': this.isBorderless,
      };
    },
    isSocialIcon() {
      return (
        this.skin === 'social' &&
        (this.$slots.iconBefore || this.$slots.iconAfter)
      );
    },
  },
  mixins: [ThemeMixin],
  components: { ButtonLoaderAtom, IconAtom },
};
</script>
