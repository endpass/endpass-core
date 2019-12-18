<template>
  <outside-click-atom @click="onClickOutside">
    <div
      ref="root"
      :class="vDateInputCssClass"
    >
      <div class="v-date-input-field">
        <label-atom
          v-if="label"
          :label="label"
        />
        <div class="v-date-input-field-inner">
          <input-atom
            v-bind="$attrs"
            :value="formattedValue"
            :is-error="isError"
            @focus="onFocusInput"
            @blur="onBlurInput"
            @keyup.enter.native="handleSubmit"
          />
          <div class="v-date-input-field-icon">
            <v-svg-icon name="calendar" />
          </div>
        </div>
        <error-atom
          v-if="isError"
          :error="error"
        />
      </div>
      <div
        v-if="isCalendarVisible"
        class="v-date-input-calendar"
        tabindex="-1"
      >
        <close-by-key-atom @close="onCalendarCloseByESC">
          <section class="v-date-input-controls">
            <button
              class="v-date-input-control"
              type="button"
              @click="onClickPreviousMonth"
            >
              <v-svg-icon name="chevron-left" />
            </button>
            <div class="v-date-input-now">
              <span>
                {{ formattedInnerMonth }}
              </span>
              <input
                v-model="innerYear"
                :min="minYear"
                :max="maxYear"
                type="number"
              >
            </div>
            <button
              class="v-date-input-control"
              type="button"
              @click="onClickNextMonth"
            >
              <v-svg-icon name="chevron-right" />
            </button>
          </section>
          <table class="v-date-input-dates">
            <tr>
              <td class="v-date-input-day">
                S
              </td>
              <td class="v-date-input-day">
                M
              </td>
              <td class="v-date-input-day">
                T
              </td>
              <td class="v-date-input-day">
                W
              </td>
              <td class="v-date-input-day">
                T
              </td>
              <td class="v-date-input-day">
                F
              </td>
              <td class="v-date-input-day">
                S
              </td>
            </tr>
            <tr
              v-for="(week, i) in currentCalendar"
              :key="`${innerYear}-${i}`"
            >
              <td
                v-for="day in week"
                :key="day.date.toString()"
              >
                <button
                  :class="{
                    'v-date-input-day': true,
                    'v-date-input-control': true,
                    'is-today': day.isToday,
                    'is-not-mine-month': !day.inTargetMonth,
                    'is-selected': isSelectedDay(day),
                  }"
                  :disabled="!isDayInRange(day.origin)"
                  type="button"
                  @click="onClickDay(day)"
                >
                  {{ day.origin.date() }}
                </button>
              </td>
            </tr>
          </table>
        </close-by-key-atom>
      </div>
    </div>
  </outside-click-atom>
</template>

<script>
import dayjs from 'dayjs';
import { getFullCalendarMonth } from '@/utils/date';
import ThemeMixin from '@/mixins/ThemeMixin';
import VSvgIcon from '@/kit/VSvgIcon';
import InputAtom from '@/atom/input-atom/input-atom';
import LabelAtom from '@/atom/label-atom/label-atom';
import ErrorAtom from '@/atom/error-atom/error-atom';
import CloseByKeyAtom from '@/atom/close-by-key-atom/close-by-key-atom';
import OutsideClickAtom from '@/atom/outside-click-atom/outside-click-atom';

const MIN_DATE = '1940-01-01';
const MAX_DATE = '2100-01-01';

export default {
  name: 'VDateInput',

  props: {
    value: {
      type: [String, Date],
      default: '',
    },

    minDate: {
      type: [String, Date],
      default: MIN_DATE,
    },

    maxDate: {
      type: [String, Date],
      default: MAX_DATE,
    },

    label: {
      type: String,
      default: '',
    },

    error: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    innerMonth: null,
    innerYear: null,
    isCalendarVisible: false,
  }),

  computed: {
    vDateInputCssClass() {
      return { ...this.themeCssClass, 'v-date-input': true };
    },

    minYear() {
      return dayjs(this.minDate).year();
    },

    maxYear() {
      return dayjs(this.maxDate).year();
    },

    isError() {
      return !!this.error;
    },

    date() {
      if (!this.value) return null;

      return dayjs(this.value);
    },

    formattedInnerMonth() {
      return dayjs()
        .month(this.innerMonth)
        .format('MMMM');
    },

    currentCalendar() {
      if (!this.isCalendarVisible) return [];

      const calendarNativeDate = new Date(this.innerYear, this.innerMonth);
      const calendarDate = dayjs(calendarNativeDate);

      return getFullCalendarMonth(calendarDate);
    },

    formattedValue() {
      if (!this.date) return '';

      return this.date.format('YYYY/MM/DD');
    },
  },

  watch: {
    value(val, oldVal) {
      if (!val) {
        this.setDefaultInnerDate();
        return;
      }

      const oldDate = dayjs(oldVal);
      const newDate = dayjs(val);
      const newDateMonth = newDate.month();
      const newDateYear = newDate.year();

      if (newDateMonth !== oldDate.month() || newDateYear !== oldDate.year()) {
        this.innerMonth = newDateMonth;
        this.innerYear = newDateYear;
      }
    },
  },

  methods: {
    setDefaultInnerDate() {
      const now = new Date();

      this.innerYear = now.getFullYear();
      this.innerMonth = now.getMonth();
    },

    isDayInRange(date) {
      const currentDate = dayjs(date);

      return (
        currentDate.isAfter(this.minDate) && currentDate.isBefore(this.maxDate)
      );
    },

    isSelectedDay({ origin }) {
      if (!this.date) return false;

      return (
        this.date.date() === origin.date() &&
        this.date.month() === origin.month() &&
        this.date.year() === origin.year()
      );
    },

    isClickInside(target, currentNode) {
      while (currentNode) {
        // eslint-disable-next-line no-param-reassign
        currentNode = currentNode.parentNode;

        if (target === currentNode) {
          return true;
        }
        if (!currentNode) {
          break;
        }
      }
      return false;
    },

    onBlurInput(e) {
      if (this.isClickInside(this.$refs.root, e.relatedTarget)) {
        return;
      }

      this.handleSubmit(e);
    },

    handleSubmit(e) {
      const valueDate = dayjs(e.target.value);

      if (valueDate.isValid()) {
        this.handleChange(valueDate.toDate());
        this.hideCalendar();
      }
    },

    onFocusInput() {
      this.isCalendarVisible = true;
    },

    hideCalendar() {
      this.isCalendarVisible = false;
    },

    onClickPreviousMonth() {
      if (this.innerMonth === 0) {
        this.innerMonth = 11;
        this.innerYear -= 1;
      } else {
        this.innerMonth -= 1;
      }
    },

    onClickNextMonth() {
      if (this.innerMonth === 11) {
        this.innerMonth = 0;
        this.innerYear += 1;
      } else {
        this.innerMonth += 1;
      }
    },

    handleChange(newValue) {
      if (!this.isDayInRange(dayjs(newValue))) {
        return;
      }

      const oldTime = dayjs(this.value)
        .toDate()
        .getTime();

      if (oldTime !== newValue.getTime()) {
        this.$emit('change', newValue);
      }
    },

    onClickDay({ origin }) {
      const newDate = origin.toDate();

      this.handleChange(newDate);
      this.hideCalendar();
    },

    onCalendarCloseByESC() {
      this.hideCalendar();
    },

    onClickOutside() {
      this.hideCalendar();
    },
  },

  mounted() {
    if (!this.date) {
      this.setDefaultInnerDate();
    } else {
      this.innerYear = this.date.year();
      this.innerMonth = this.date.month();
    }
  },

  mixins: [ThemeMixin],

  components: {
    VSvgIcon,
    LabelAtom,
    InputAtom,
    ErrorAtom,
    CloseByKeyAtom,
    OutsideClickAtom,
  },

  model: {
    event: 'change',
    prop: 'value',
  },
};
</script>
