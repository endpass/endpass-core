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
        return ['normal', 'mini'].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    toggleAtomCssClass() {
      return Object.assign({}, this.themeCssClass, {
        [`size-${this.size}`]: true,
      });
    },
  },
  mixins: [ThemeMixin],
};
</script>
