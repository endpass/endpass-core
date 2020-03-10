<template>
  <span
    class="button-loader-molecule"
    :class="themeCssClass"
  >
    <svg-atom name="empty" />
    <span class="button-loader-molecule-spinner">
      <svg-atom name="loader" />
    </span>
  </span>
</template>

<script>
import SvgAtom from '@/atom/svg-atom/svg-atom';
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'ButtonLoaderMolecule',
  mixins: [ThemeMixin],
  components: { SvgAtom },
};
</script>
