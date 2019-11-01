<template>
  <ul :class="vCodeInputCssClass">
    <template v-for="(value, idx) in numbers">
      <li
        :key="`input-${idx}`"
        class="v-code-input-item"
      >
        <input-atom
          :ref="idx"
          class="v-code-input-number"
          :value="value"
          :disabled="disabled"
          placeholder="0"
          maxlength="1"
          @keyup="onKeypress(idx, $event)"
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

    count: {
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

    focusTargetIdx() {
      const unfilledNumberIdx = this.numbers.findIndex(number => number === '');

      if (unfilledNumberIdx === -1) {
        return this.numbers.length - 1;
      }

      return unfilledNumberIdx;
    },

    separatorsCount() {
      // eslint-disable-next-line
      return ((this.count / this.interval) >> 0) - 1;
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
      const splittedValue = value.split('').slice(0, this.count);
      const emptyNumbers = new Array(this.count - splittedValue.length).fill(
        '',
      );

      splittedValue.concat(emptyNumbers).forEach((value, idx) => {
        this.setNumberValueByIndex(idx, value);
      });
    },

    focusNumberByIdx(idx) {
      const targetRef = this.$refs[idx];

      if (!targetRef) return;

      const [targetInputWrapper] = targetRef;
      const targetInput = targetInputWrapper.$el.querySelector('input');

      targetInput.focus();
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

    onPressBackspace(idx) {
      this.setNumberValueByIndex(idx, '');

      if (idx === 0) return;

      this.focusNumberByIdx(idx - 1);
    },

    onPressKey(idx, e) {
      this.setNumberValueByIndex(this.focusTargetIdx, e.target.value);
      this.focusNumberByIdx(this.focusTargetIdx);
    },

    onKeypress(idx, e) {
      switch (e.key) {
        case 'Tab':
          break;
        case 'Backspace':
          this.onPressBackspace(idx);
          break;
        default:
          this.onPressKey(idx, e);
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
