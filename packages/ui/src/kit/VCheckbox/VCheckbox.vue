<template>
  <label
    class="v-checkbox"
    :class="checkboxCssClass"
  >
    <icon-atom
      class="v-checkbox-frame"
      v-html="checkSvgIcon"
    />
    <input
      type="checkbox"
      :disabled="disabled"
      :name="name"
      class="v-checkbox-control"
      :class="{ 'is-danger': error }"
      :checked="isChecked"
      :value="value"
      @change="updateInput"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
    <span class="v-checkbox-label">
      <slot />
    </span>
  </label>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';
import IconAtom from '@/atom/icon-atom/icon-atom';
import checkSvgIcon from '@/img/check.svg';

export default {
  name: 'VCheckbox',
  props: {
    name: {
      type: String,
      default: 'checkbox',
    },
    value: {
      type: [String, Boolean],
      default: false,
    },
    modelValue: {
      type: null,
      default: false,
    },
    trueValue: {
      type: null,
      default: true,
    },
    falseValue: {
      type: null,
      default: false,
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
      isFocused: false,
      checkSvgIcon,
    };
  },
  computed: {
    isChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value);
      }
      return this.modelValue === this.trueValue;
    },
    checkboxCssClass() {
      return Object.assign(this.themeCssClass, {
        'is-checked': this.isChecked,
        'is-focused': this.isFocused,
        'is-disabled': this.disabled || this.$attrs.disabled,
        'is-error': this.error,
      });
    },
  },
  methods: {
    updateInput(event) {
      const isChecked = event.target.checked;
      if (this.modelValue instanceof Array) {
        const newValue = [...this.modelValue];
        if (isChecked) {
          newValue.push(this.value);
        } else {
          newValue.splice(newValue.indexOf(this.value), 1);
        }
        this.$emit('change', newValue);
      } else {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue);
      }
    },
  },
  mixins: [ThemeMixin],
  components: { IconAtom },
  model: {
    prop: 'modelValue',
    event: 'change',
  },
};
</script>
