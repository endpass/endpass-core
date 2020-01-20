// @ts-check
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
const weekOfYear = require('dayjs/plugin/weekOfYear');

/**
 * Setting up dayjs globally
 */
dayjs.extend(relativeTime);
dayjs.extend(weekOfYear);

/**
 * @param {Date} date
 * @param {string} [template]
 * @returns {string}
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
 * @param {Date} toDate
 * @returns {string}
 */
const fromTo = (fromDate, toDate) => {
  const start = dayjs(fromDate);

  return start.to(dayjs(toDate));
};

/**
 * @param {Date|string|number} date
 * @param {number} value
 * @param {dayjs.OpUnitType} [unit]
 * @returns {Date}
 */
const addToDate = (date, value, unit = 's') =>
  dayjs(date)
    .add(value, unit)
    .toDate();

/**
 * @param {Date|string} date
 * @returns {number}
 */
const getWeek = date => dayjs(date).week();

/**
 * @param {string|number} value
 * @returns {Date}
 */
const toEqualLocalTime = value => {
  const date = new Date(value);
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const normalizedDate = new Date(date.getTime() + userTimezoneOffset);

  return normalizedDate;
};

/**
 * @param {string|number} value
 * @returns {number}
 */
const toDayBeginInUTC = value => {
  const date = new Date(value);
  const utcDate = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0,
  );

  return utcDate;
};

module.exports = {
  formateDate,
  fromNow,
  fromTo,
  addToDate,
  getWeek,
  toEqualLocalTime,
  toDayBeginInUTC,
};
