<template>
  <a
    class="v-link"
    :class="classNames"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </a>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VLink',

  props: {
    isUnderline: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classNames() {
      return { ...this.themeCssClass, [`is-underline`]: this.isUnderline };
    },
  },
  mixins: [ThemeMixin],
};
</script>
