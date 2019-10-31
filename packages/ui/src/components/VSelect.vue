<template>
  <div class="field">
    <label
      v-if="label"
      class="label"
    >{{ label }}</label>
    <div class="control select">
      <select
        v-model="selected"
        :disabled="disabled"
        :name="name"
      >
        <option
          v-for="item in normalizedOptions"
          :key="item.key || item.val || item"
          :value="item.val"
        >
          {{ item.text }}
        </option>
      </select>
    </div>
    <p
      v-if="error"
      class="help is-danger"
    >
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'VSelect',
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    error: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(newVal) {
        this.$emit('input', newVal);
      },
    },

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
  },
};
</script>

<style lang="scss">
.select {
  &:not(.is-multiple):not(.is-loading)::after {
    border-color: $primary;
  }
  .field .is-naked &,
  form .is-naked &,
  .modal .is-naked & {
    select {
      background-color: transparent;
      color: $white;
      border: none;
      &.is-active,
      &:active,
      &.is-focused,
      &:focus {
        border: 1px solid $white;
        box-shadow: none;
      }
    }
    &::after,
    &:hover::after {
      border-color: $white;
    }
  }
}
</style>
