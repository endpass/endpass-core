<template>
  <button
    class="file-select-atom"
    :class="buttonCssClass"
    type="button"
  >
    <label
      class="file-select-atom-label"
      :for="inputId"
    >
      <span class="file-select-atom-slot">
        <slot />
      </span>
      <input
        :id="inputId"
        type="file"
        class="file-select-atom-input"
        v-bind="$attrs"
        @change="onChange"
      >
    </label>
  </button>
</template>

<script>
import ThemeMixin from '@/mixins/ThemeMixin';

let inputId = 1;

export default {
  name: 'FileSelectAtom',
  props: {
    skin: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'ghost'].indexOf(value) !== -1;
      },
    },
    size: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'big', 'area'].indexOf(value) !== -1;
      },
    },
  },
  data() {
    return {
      // eslint-disable-next-line no-plusplus
      inputId: `file-select-atom-idx-${inputId++}`,
    };
  },
  computed: {
    buttonCssClass() {
      return Object.assign({}, this.themeCssClass, {
        [`size-${this.size}`]: true,
        [`skin-${this.skin}`]: true,
      });
    },
  },
  methods: {
    onChange(e) {
      this.$emit('change', e);

      // drop value for reselect file(s)
      // eslint-disable-next-line no-param-reassign
      e.target.value = '';
    },
  },
  mixins: [ThemeMixin],
};
</script>
