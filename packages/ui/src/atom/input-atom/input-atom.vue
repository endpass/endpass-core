<template>
  <span
    class="input-atom"
    :class="inputAtomCssClass"
    :disabled="$attrs.disabled"
  >
    <input
      ref="input"
      class="input-atom-control"
      :value="value"
      v-bind="$attrs"
      v-on="listeners"
      @input="onInput"
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
  data() {
    return {
      isScrolled: false,
    };
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
  methods: {
    onInput() {
      this.isScrolled = false;
    },
    onScroll() {
      if (this.isScrolled) {
        return;
      }
      this.isScrolled = true;
      const el = document.activeElement;
      if (el === this.$refs.input) {
        el.blur();
        el.focus();
      }
    },
  },
  mounted() {
    window.document.addEventListener('scroll', this.onScroll);
  },
  destroyed() {
    window.document.removeEventListener('scroll', this.onScroll);
  },
  mixins: [ThemeMixin],
};
</script>
