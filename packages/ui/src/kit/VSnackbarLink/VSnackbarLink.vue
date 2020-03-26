<template>
  <link-atom
    :class="themeCssClass"
    class="v-snackbar-link"
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

  mixins: [ThemeMixin],

  components: { LinkAtom },
};
</script>
