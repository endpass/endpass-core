<template>
  <button
    :class="vTabsControlCssClass"
    v-on="$listeners"
  >
    {{ label }}
  </button>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VTabsControl',

  props: {
    label: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    vTabsControlCssClass() {
      return { ...this.themeCssClass, 'v-tabs-control': true,
        'is-active': this.isActive,};
    },
  },

  mixins: [ThemeMixin],
};
</script>
