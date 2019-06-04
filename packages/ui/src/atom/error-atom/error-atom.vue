<template>
  <div
    :class="themeCssClass"
    class="v-error-atom"
  >
    {{ error }}
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'ErrorAtom',
  props: {
    error: {
      type: String,
      required: true,
    },
  },
  mixins: [ThemeMixin],
};
</script>
