<template>
  <span
    class="input-atom"
    :class="inputAtomCssClass"
    :disabled="disabled"
  >
    <input
      class="input-atom-control"
      :value="value"
      :disabled="disabled"
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

    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: e => {
          this.$emit('input', e.target.value);
        },
      };
    },

    inputAtomCssClass() {
      return Object.assign(this.themeCssClass, {
        'is-error': this.$attrs['is-error'],
      });
    },
  },
  mixins: [ThemeMixin],
};
</script>
