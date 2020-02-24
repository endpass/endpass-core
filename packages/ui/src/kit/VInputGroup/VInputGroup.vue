<template>
  <div>
    <div :class="vInputGroupCssClass">
      <slot />
    </div>
    <error-atom
      v-if="isError"
      :error="error"
    />
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import ErrorAtom from '@/atom/error-atom/error-atom';

export default {
  name: 'VInputGroup',

  props: {
    error: {
      type: String,
      default: null,
    },
  },

  computed: {
    vInputGroupCssClass() {
      return {
        ...this.themeCssClass,
        'v-input-group': true,
        'is-error': this.isError,
      };
    },

    isError() {
      return !!this.error;
    },
  },

  mixins: [ThemeMixin],

  components: {
    ErrorAtom,
  },
};
</script>
