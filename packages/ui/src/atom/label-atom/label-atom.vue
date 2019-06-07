<template>
  <label :class="themeCssClass">
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
  },
  mixins: [ThemeMixin],
};
</script>
