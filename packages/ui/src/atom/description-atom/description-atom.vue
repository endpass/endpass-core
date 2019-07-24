<template>
  <div
    :class="themeCssClass"
    class="description-atom"
  >
    {{ description }}
    <slot />
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
