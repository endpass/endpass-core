<template>
  <div
    class="v-error"
    :class="themeCssClass"
  >
    <error-atom
      v-bind="$attrs"
    />
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import ErrorAtom from '@/atom/error-atom/error-atom';

export default {
  name: 'VError',

  mixins: [ThemeMixin],

  components: {
    ErrorAtom,
  },
};
</script>
