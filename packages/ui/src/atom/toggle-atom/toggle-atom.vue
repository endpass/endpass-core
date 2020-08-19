<template>
  <label
    class="toggle-atom"
    :class="toggleAtomCssClass"
  >
    <slot />
    <span class="toggle-atom-handle" />
  </label>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'ToggleAtom',

  props: {
    size: {
      type: String,
      required: true,
      validator(value) {
        return ['normal', 'mini'].includes(value);
      },
    },

    skin: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary'].includes(value);
      },
    },
  },

  computed: {
    toggleAtomCssClass() {
      return {
        ...this.themeCssClass,
        [`skin-${this.skin}`]: !!this.skin,
        [`size-${this.size}`]: true,
      };
    },
  },

  mixins: [ThemeMixin],
};
</script>
