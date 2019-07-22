<template>
  <div :class="vLogoCssClass">
    <div class="v-logo-image">
      <svg-atom name="endpass" />
    </div>
    <span class="v-logo-label">
      Endpass
    </span>
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import SvgAtom from '@/atom/svg-atom/svg-atom';

export default {
  name: 'VLogo',

  props: {
    isWhite: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    vLogoCssClass() {
      return Object.assign(this.themeCssClass, {
        'v-logo': true,
        'is-white': this.isWhite,
      });
    },
  },

  mixins: [ThemeMixin],

  components: {
    SvgAtom,
  },
};
</script>
