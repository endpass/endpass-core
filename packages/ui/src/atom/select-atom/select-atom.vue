<template>
  <span
    class="select-atom"
    :class="selectAtomCssClass"
  >
    <select
      class="select-atom-control"
      :value="value"
      v-bind="$attrs"
      v-on="listeners"
    >
      <option
        v-for="item in normalizedOptions"
        :key="item.key || item.val || item"
        :value="item.val"
      >
        {{ item.text }}
      </option>
    </select>
    <slot />
  </span>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'SelectAtom',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    skin: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary'].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    normalizedOptions() {
      return this.options.reduce((acc, item) => {
        if (item instanceof Object) {
          return acc.concat(item);
        }

        return acc.concat({
          val: item,
          key: item,
          text: item,
        });
      }, []);
    },

    listeners() {
      return Object.assign(this.$listeners, {
        input: event => {
          this.$emit('input', event.target.value);
        },
      });
    },

    selectAtomCssClass() {
      return {
        ...this.themeCssClass,
        'is-error': this.$attrs['is-error'],
        [`skin-${this.skin}`]: true,
      };
    },
  },

  mixins: [ThemeMixin],
};
</script>
