<template>
  <span
    class="textarea-atom"
    :class="textareaAtomCssClass"
    :disabled="disabled"
  >
    <textarea
      class="textarea-atom-control"
      :value="value"
      :disabled="disabled"
      v-bind="$attrs"
      v-on="listeners"
    />
    <slot />
  </span>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'TextareaAtom',
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
      return { ...this.$listeners,
        input: e => {
          this.$emit('input', e.target.value);
        } };
    },

    textareaAtomCssClass() {
      return Object.assign(this.themeCssClass, {
        'is-error': this.$attrs['is-error'],
      });
    },
  },

  mixins: [ThemeMixin],
};
</script>
