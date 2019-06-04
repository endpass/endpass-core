<template>
  <div
    :class="themeCssClass"
    class="v-description-atom"
  >
    {{ description }}
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'DescriptionAtom',
  props: {
    description: {
      type: String,
      required: true,
    },
  },
  mixins: [ThemeMixin],
};
</script>
