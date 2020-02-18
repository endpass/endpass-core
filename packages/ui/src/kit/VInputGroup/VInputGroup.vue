<template>
  <div :class="vInputGroupCssClass">
    <slot />
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VInputGroup',

  computed: {
    vInputGroupCssClass() {
      return {
        ...this.themeCssClass,
        'v-input-group': true,
      };
    },
  },

  mixins: [ThemeMixin],
};
</script>
