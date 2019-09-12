<template>
  <span
    class="button-loader-atom"
    :class="themeCssClass"
  >
    <svg-atom name="empty" />
    <span class="button-loader-atom-spinner">
      <svg-atom name="loader" />
    </span>
  </span>
</template>

<script>
import SvgAtom from '@/atom/svg-atom/svg-atom';
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'ButtonLoaderAtom',
  mixins: [ThemeMixin],
  components: { SvgAtom },
};
</script>
