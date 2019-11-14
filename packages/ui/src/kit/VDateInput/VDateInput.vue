<template>
  <outside-click-atom @click="onClickOutside">
    <div :class="vDateInputCssClass">
      <div class="v-date-input-field">
        <label-atom v-if="label" :label="label" />
        <div class="v-date-input-field-inner">
          <input-atom
            v-bind="$attrs"
            :value="formattedValue"
            :is-error="isError"
            @focus="onFocusInput"
            @blur="onBlurInput"
          />
          <div class="v-date-input-field-icon">
            <v-svg-icon name="calendar" />
          </div>
        </div>
        <error-atom v-if="isError" :error="error" />
      </div>
      <div v-if="isCalendarVisible" class="v-date-input-calendar">
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
              />
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
              <td class="v-date-input-day">S</td>
              <td class="v-date-input-day">M</td>
              <td class="v-date-input-day">T</td>
              <td class="v-date-input-day">W</td>
              <td class="v-date-input-day">T</td>
              <td class="v-date-input-day">F</td>
              <td class="v-date-input-day">S</td>
            </tr>
            <tr v-for="(week, i) in currentCalendar" :key="`${innerYear}-${i}`">
              <td v-for="day in week" :key="day.date.toString()">
                <button
                  :class="{
                    'v-date-input-day': true,
                    'v-date-input-control': true,
                    'is-today': day.isToday,
                    'is-disabled': !day.inTargetMonth,
                    'is-selected': isSelectedDay(day),
                  }"
                  :disabled="
                    !day.inTargetMonth || day.isToday || isSelectedDay(day)
                  "
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

export default {
  name: 'VDateInput',

  props: {
    value: {
      type: [String, Date],
      default: '',
    },

    minYear: {
      type: Number,
      default: 1940,
    },

    maxYear: {
      type: Number,
      default: 2100,
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

    isSelectedDay({ origin }) {
      if (!this.date) return false;

      return (
        this.date.date() === origin.date() &&
        this.date.month() === origin.month() &&
        this.date.year() === origin.year()
      );
    },

    onBlurInput(e) {
      const valueDate = dayjs(e.target.value);

      if (valueDate.isValid()) {
        this.$emit('change', valueDate.toDate());
      }
    },

    onFocusInput() {
      this.isCalendarVisible = true;
    },

    onChangeYearInput(e) {
      this.innerYear = e.target.value;
    },

    onClickPreviousMonth() {
      if (this.innerMonth === 0) {
        this.innerMonth = 11;
        this.innerYear = this.innerYear - 1;
      } else {
        this.innerMonth = this.innerMonth - 1;
      }
    },

    onClickNextMonth() {
      if (this.innerMonth === 11) {
        this.innerMonth = 0;
        this.innerYear = this.innerYear + 1;
      } else {
        this.innerMonth = this.innerMonth + 1;
      }
    },

    onClickDay({ origin }) {
      const { innerMonth, innerYear } = this;
      const newDate = origin
        .month(innerMonth)
        .year(innerYear)
        .toDate();

      this.$emit('change', newDate);
      this.isCalendarVisible = false;
    },

    onCalendarCloseByESC() {
      this.isCalendarVisible = false;
    },

    onClickOutside() {
      this.isCalendarVisible = false;
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
  },
};
</script>

