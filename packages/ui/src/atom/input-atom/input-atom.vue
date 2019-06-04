<template>
  <div
    :class="inputAtomCssClass"
    class="v-input-atom"
  >
    <input
      class="v-input-atom-control"
      :value="value"
      v-bind="$attrs"
      v-on="listeners"
    >
    <slot />
  </div>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'InputAtom',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
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
