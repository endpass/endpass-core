<template>
  <label
    class="label-atom"
    :class="labelCssClass"
  >
    {{ label }}
  </label>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'LabelAtom',

  props: {
    label: {
      type: String,
      required: true,
    },

    isError: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    labelCssClass() {
      return Object.assign(this.themeCssClass, {
        'is-error': this.isError,
      });
    },
  },

  mixins: [ThemeMixin],
};
</script>
