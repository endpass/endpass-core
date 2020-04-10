<template>
  <link-atom
    :class="themeCssClass"
    class="v-snackbar-link"
    :href="href"
    :target="target"
    :disabled="disabled"
    v-on="$listeners"
  >
    <slot />
  </link-atom>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import LinkAtom from '@/atom/link-atom/link-atom';

export default {
  name: 'VSnackbarLink',

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
  },

  mixins: [ThemeMixin],

  components: { LinkAtom },
};
</script>
