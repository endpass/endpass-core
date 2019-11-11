<template>
  <label :class="vRadioCssClass">
    <input
      v-bind="$attrs"
      :checked="value === modelValue"
      type="radio"
      class="v-radio-input"
      @input="onInputChange"
    />
    <span class="v-radio-box"></span>
    <span v-if="$slots.default" class="v-radio-label">
      <slot />
    </span>
  </label>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VRadio',

  props: {
    value: {
      type: String,
      required: true,
    },

    modelValue: {
      type: String,
      default: null,
    },

    isError: {
      type: Boolean,
      default: false,
    }
  },

  computed: {
    vRadioCssClass() {
      return Object.assign({}, this.themeCssClass, {
        'v-radio': true,
        'is-error': this.isError,
        'is-disabled': this.$attrs.disabled,
      });
    },
  },

  methods: {
    onInputChange(e) {
      this.$emit('change', this.value);
    },
  },

  mixins: [ThemeMixin],

  model: {
    prop: 'modelValue',
    event: 'change'
  },
};
</script>
