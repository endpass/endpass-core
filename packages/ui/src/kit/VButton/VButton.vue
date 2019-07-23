<template>
  <button
    :class="vButtonCssClass"
    class="v-button"
    v-on="$listeners"
  >
    <icon-atom
      v-if="$slots.iconBefore"
      class="v-button-icon icon-before"
    >
      <slot name="iconBefore" />
    </icon-atom>
    <span class="v-button-label">
      <slot />
    </span>
    <icon-atom
      v-if="$slots.iconAfter"
      class="v-button-icon icon-after"
    >
      <slot name="iconAfter" />
    </icon-atom>
  </button>
</template>

<script>
import IconAtom from '@/atom/icon-atom/icon-atom';
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
  components: { IconAtom },
};
</script>
