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
        v-for="item in options"
        :key="item.key || item.val || item"
        :value="getOptionParameter(item, 'val')"
      >
        {{ getOptionParameter(item, 'text') }}
      </option>
    </select>
    <slot />
  </span>
</template>

<script>
import getOptionParameter from '@endpass/utils/getOptionParameter';
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
  },
  computed: {
    listeners() {
      return Object.assign(this.$listeners, {
        input: (event) => {
          this.$emit('input', event.target.value);
        },
      });
    },

    selectAtomCssClass() {
      return Object.assign(this.themeCssClass, {
        'is-error': this.$attrs['is-error'],
      });
    },
  },
  methods: {
    getOptionParameter,
  },
  mixins: [ThemeMixin],
};
</script>
