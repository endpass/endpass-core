<template>
  <div class="field">
    <label class="checkbox">
      <input
        v-model="innerValue"
        :name="name"
        :class="{ 'is-danger': error }"
        type="checkbox"
      >
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  name: 'VCheckbox',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: 'checkbox',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      innerValue: this.value,
    };
  },
  watch: {
    value(value) {
      this.innerValue = value;
    },
    innerValue(value) {
      this.$emit('input', value);
    },
  },
};
</script>
