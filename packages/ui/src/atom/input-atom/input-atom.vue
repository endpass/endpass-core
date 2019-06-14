<template>
  <span
    class="input-atom"
    :class="inputAtomCssClass"
  >
    <input
      class="input-atom-control"
      :value="value"
      v-bind="$attrs"
      v-on="listeners"
    >
    <slot />
  </span>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'InputAtom',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
  },
  computed: {
    listeners() {
      return Object.assign(this.$listeners, {
        input: (event) => {
          this.$emit('input', event.target.value);
        },
      });
    },
    inputAtomCssClass() {
      return Object.assign(this.themeCssClass, {
        'is-disabled': this.$attrs.disabled,
      });
    },
  },
  mixins: [ThemeMixin],
};
</script>
