<template>
  <div :class="vInputGroupCssClass">
    <slot />
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VInputGroup',

  props: {
    skin: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary'].indexOf(value) !== -1;
      },
    },
  },

  computed: {
    vInputGroupCssClass() {
      return {
        ...this.themeCssClass,
        'v-input-group': true,
        [this.skin]: true,
      };
    },
  },

  mixins: [ThemeMixin],
};
</script>
