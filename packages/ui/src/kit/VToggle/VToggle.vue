<template>
  <div
    class="v-toggle"
    :class="themeCssClass"
  >
    <toggle-atom
      :size="size"
      :skin="skin"
      :class="toggleCssClass"
    >
      <input
        title=""
        :checked="isChecked"
        :value="value"
        class="v-toggle-control"
        type="checkbox"
        v-bind="$attrs"
        @change="handleChange"
      >
    </toggle-atom>
    <span
      v-if="$slots.default"
      class="v-toggle-label"
    >
      <slot />
    </span>
  </div>
</template>

<script>
import ToggleAtom from '@/atom/toggle-atom/toggle-atom';
import ThemeMixin from '@/mixins/ThemeMixin';
import IsDisabledMixin from '@/mixins/IsDisabledMixin';

export default {
  name: 'VToggle',

  inheritAttrs: false,

  props: {
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

    skin: {
      type: String,
      default: 'primary',
    },

    size: {
      type: String,
      default: 'normal',
    },
  },

  computed: {
    isChecked() {
      const isListHandling = this.modelValue instanceof Array;

      if (isListHandling) {
        return this.modelValue.includes(this.value);
      }

      return this.modelValue === this.trueValue;
    },

    toggleCssClass() {
      return {
        'is-checked': this.isChecked,
        'is-disabled': this.$attrs.disabled,
        [`size-${this.size}`]: true,
      };
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

  components: { ToggleAtom },

  model: {
    prop: 'modelValue',
    event: 'change',
  },
};
</script>
