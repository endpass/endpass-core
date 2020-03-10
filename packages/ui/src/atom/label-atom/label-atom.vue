<template>
  <label
    class="label-atom"
    :class="themeCssClass"
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
  },

  mixins: [ThemeMixin],
};
</script>
