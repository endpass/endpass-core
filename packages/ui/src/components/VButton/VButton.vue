<template>
  <button
    :class="vButtonCssClass"
    class="v-button"
    v-on="$listeners"
  >
    <span class="v-button-label">
      <slot />
    </span>
    <icon-atom
      v-if="$slots.icon"
      class="v-button-icon"
    >
      <slot name="icon" />
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
    },
    size: {
      type: String,
      default: 'normal',
    },
  },
  computed: {
    vButtonCssClass() {
      return Object.assign(this.themeCssClass, {
        [`skin-${this.skin}`]: true,
        [`size-${this.size}`]: true,
      });
    },
  },
  mixins: [ThemeMixin],
  components: { IconAtom },
};
</script>
