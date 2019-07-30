<template>
  <span
    class="textarea-atom"
    :class="textareaAtomCssClass"
    :disabled="$attrs.disabled"
  >
    <textarea
      class="textarea-atom-control"
      :value="value"
      v-bind="$attrs"
      v-on="listeners"
    ></textarea>
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
  },
  computed: {
    listeners() {
      return Object.assign({},
        this.$listeners,
        {
          input: (e) => {
            this.$emit('input', e.target.value);
          },
        });
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
