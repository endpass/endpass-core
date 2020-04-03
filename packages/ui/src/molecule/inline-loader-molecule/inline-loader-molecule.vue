<template>
  <span
    class="inline-loader-molecule"
    :class="themeCssClass"
  >
    <svg-atom name="empty" />
    <span class="inline-loader-molecule-spinner">
      <svg-atom name="loader" />
    </span>
  </span>
</template>

<script>
import SvgAtom from '@/atom/svg-atom/svg-atom';
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'InlineLoaderMolecule',

  mixins: [ThemeMixin],

  components: {
    SvgAtom,
  },
};
</script>
