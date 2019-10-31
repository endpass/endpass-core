<template>
  <div class="field is-horizontal has-addons v-radio">
    <label
      v-if="label"
      class="label"
    >
      {{ label }}
    </label>
    <div
      v-for="option in normalizedOptions"
      :key="'label' + getKeyString(option)"
      class="control"
    >
      <label
        :class="{
          'is-info is-selected': option.val === value,
        }"
        :for="id + getKeyString(option)"
        class="button is-multiline"
      >
        {{ option.key }}
        <span
          v-if="option.help"
          class="help"
        >
          {{ option.help }}
        </span>
      </label>
      <input
        :id="id + getKeyString(option)"
        v-model="selected"
        :name="name"
        :value="option.val"
        type="radio"
      >
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
  name: 'VRadio',
  props: {
    value: {
      type: [Number, String],
      default: null,
    },
    id: {
      type: String,
      default: '',
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
          key: item,
          val: item,
        });
      }, []);
    },
  },

  methods: {
    getKeyString: item => item.key || item.val || item,
  },
};
</script>

<style lang="css">
.v-radio input {
  display: none;
}
</style>
