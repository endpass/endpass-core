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
      :disabled="disabled"
      :name="name"
      :class="{ 'is-danger': error }"
      :checked="isChecked"
      :value="value"
      class="v-checkbox-control"
      type="checkbox"
      @change="handleChange"
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
import IsDisabledMixin from '@/mixins/IsDisabledMixin';
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
      const isListHandling = this.modelValue instanceof Array;

      if (isListHandling) {
        return this.modelValue.includes(this.value);
      }

      return this.modelValue === this.trueValue || this.value === this.trueValue;
    },

    checkboxCssClass() {
      return Object.assign(this.themeCssClass, {
        'is-checked': this.isChecked,
        'is-focused': this.isFocused,
        'is-disabled': this.disabled || this.isDisabled,
        'is-error': this.error,
      });
    },
  },

  methods: {
    handleChange(event) {
      const { checked } = event.target;
      const isListHandling = this.modelValue instanceof Array;

      if (!isListHandling) {
        this.$emit('change', checked ? this.trueValue : this.falseValue);
        return;
      }

      const newValue = [...this.modelValue];

      if (this.modelValue.includes(this.value)) {
        newValue.splice(newValue.indexOf(this.value), 1);
      } else {
        newValue.push(this.value);
      }

      this.$emit('change', newValue);
    },
  },

  mixins: [ThemeMixin, IsDisabledMixin],

  components: { IconAtom },

  model: {
    prop: 'modelValue',
    event: 'change',
  },
};
</script>
