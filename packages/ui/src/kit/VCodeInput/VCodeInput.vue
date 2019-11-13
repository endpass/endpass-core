<template>
  <ul
    ref="root"
    :class="vCodeInputCssClass"
    @input="onInput"
  >
    <template v-for="(value, idx) in numbers">
      <li
        :key="`input-${idx}`"
        class="v-code-input-item"
      >
        <input-atom
          class="v-code-input-number"
          :value="value"
          :disabled="disabled"
          type="number"
          placeholder="0"
          maxlength="1"
          :data-index="idx"
          @paste="onPasteNumber"
        />
      </li>
      <li
        v-if="isNeedSeparator(idx + 1)"
        :key="`separator-${idx}`"
        class="v-code-input-item is-delimeter"
      />
    </template>
  </ul>
</template>

<script>
import InputAtom from '@/atom/input-atom/input-atom';
import ThemeMixin from '@/mixins/ThemeMixin';

export default {
  name: 'VCodeInput',

  props: {
    value: {
      type: String,
      default: '',
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    length: {
      type: Number,
      default: 6,
    },

    interval: {
      type: Number,
      default: 3,
    },
  },

  data: () => ({
    numbers: [],
  }),

  computed: {
    vCodeInputCssClass() {
      return { ...this.themeCssClass, 'v-code-input': true };
    },

    inputValue() {
      return this.numbers.join('');
    },
  },

  watch: {
    value(val) {
      if (val !== this.inputValue) {
        this.fillNumbers(val);
      }
    },

    numbers: {
      deep: true,
      handler() {
        this.$emit('input', this.inputValue);
      },
    },
  },

  methods: {
    isNeedSeparator(idx) {
      const { numbers, interval } = this;

      if (idx === 0 || idx === numbers.length) return false;

      return idx % interval === 0;
    },

    fillNumbers(value) {
      const splittedValue = value.split('').slice(0, this.length);
      const emptyNumbers = new Array(this.length - splittedValue.length).fill(
        '',
      );

      splittedValue.concat(emptyNumbers).forEach((value, idx) => {
        this.setNumberValueByIndex(idx, value);
      });
    },

    focusNumberByIdx(idx) {
      if (!this.$refs.root) {
        return;
      }

      const input = this.$refs.root.querySelector(`[data-index="${idx}"]`);

      if (input) {
        input.focus();
      }
    },

    onPasteNumber(e) {
      e.preventDefault();

      const pasteData = (e.clipboardData || window.clipboardData).getData(
        'text',
      );

      if (!pasteData) return;

      this.fillNumbers(pasteData);
      this.focusNumberByIdx(pasteData.length);
    },

    handleBackspace(idx) {
      if (idx === 0) return;
      this.setNumberValueByIndex(idx, '');

      this.focusNumberByIdx(idx - 1);
    },

    handleInsertText(idx, value) {
      this.setNumberValueByIndex(idx, value);
      this.focusNumberByIdx(idx + 1);
    },

    onInput(e) {
      const idx = e.target.getAttribute('data-index') - 0;
      const value = `${e.target.value}`.split('').pop();

      switch (e.inputType) {
        case 'insertText':
        case 'insertCompositionText':
          this.handleInsertText(idx, value);
          break;
        case 'deleteContentBackward':
          this.handleBackspace(idx);
          break;
        default:
          break;
      }
    },

    setNumberValueByIndex(idx, value) {
      this.$set(this.numbers, idx, value);
    },
  },

  mounted() {
    this.fillNumbers(this.value);
  },

  mixins: [ThemeMixin],

  components: {
    InputAtom,
  },
};
</script>
