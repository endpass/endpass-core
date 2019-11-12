import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import chunk from 'lodash/chunk';

/**
 * @typedef {object} CalendarDay
 * @property {Dayjs} origin
 * @property {Date} date
 * @property {string} formatted
 * @property {boolean} isToday
 * @property {boolean} inTargetMonth
 */

/**
 * Setting up dayjs globally
 */
dayjs.extend(relativeTime);

/**
 * @param {Date} date
 * @param {string} template
 * @returns {Date}
 */
const formateDate = (date, template = 'YYYY-MM-DD H:mm') =>
  dayjs(date).format(template);

/**
 * @param {Date} date
 * @returns {string}
 */
const fromNow = date => dayjs(date).fromNow();

/**
 * @param {Date} fromDate
 * @param {string} toDate
 * @returns {Date}
 */
const fromTo = (fromDate, toDate) => dayjs(fromDate).to(dayjs(toDate));

/**
 * @param {Date} date
 * @param {number} value
 * @param {string} unit
 * @returns {Date}
 */
const addToDate = (date, value, unit = 's') =>
  dayjs(date)
    .add(value, unit)
    .toDate();

/**
 * @param {object} params
 * @property {number|string} [params.year]
 * @property {number|string} [params.month] Semantically adapted month
 *  Can be used with numbers from 1 to 12, where 1 is January and 12 is December
 * @returns {Array<CalendarDay[]>}
 */
const getMonthCalendar = (params = {}) => {
  const days = [];
  const now = dayjs(new Date());
  const targetYear = params.year || now.year();
  const targetMonth = params.month || now.month() + 1;
  const d = dayjs(new Date(`${targetYear}-${targetMonth}-1`));
  const startDay = d.startOf('week');
  const endDay = d.endOf('month').endOf('week');
  let currentDay = startDay.clone();

  while (!currentDay.isAfter(endDay)) {
    days.push(currentDay);
    currentDay = currentDay.add(1, 'day');
  }

  const formattedDays = days.map(day => ({
    origin: day,
    date: day.toDate(),
    formatted: day.format(),
    inTargetMonth: day.month() + 1 === targetMonth,
    isToday:
      day.day() === now.day() &&
      day.month() === now.month() &&
      day.year() === now.year(),
  }));

  return chunk(formattedDays, 7);
};

module.exports = {
  formateDate,
  fromNow,
  fromTo,
  addToDate,
  getMonthCalendar,
};
