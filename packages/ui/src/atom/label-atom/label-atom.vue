<template>
  <label
    class="label-atom"
    :class="themeCssClass"
    :disabled="disabled"
  >
    {{ label }}
    <slot />
  </label>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'LabelAtom',

  props: {
    label: {
      type: String,
      default: '',
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  mixins: [ThemeMixin],
};
</script>
