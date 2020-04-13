<template>
  <a
    class="link-atom"
    :class="classNames"
    :href="href"
    :disabled="disabled"
    :target="target"
    :role="role"
    v-on="$listeners"
  >
    <slot />
  </a>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'LinkAtom',

  props: {
    href: {
      type: String,
      default: null,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    target: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      default: null,
    },

    isUnderline: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classNames() {
      return { ...this.themeCssClass, 'is-underline': this.isUnderline };
    },
  },

  mixins: [ThemeMixin],
};
</script>
