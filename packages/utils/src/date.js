// @ts-check

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import weekOfYear from 'dayjs/plugin/weekOfYear';

/**
 * Setting up dayjs globally
 */
dayjs.extend(relativeTime);
dayjs.extend(weekOfYear);

/**
 * @param {dayjs.ConfigType} date
 * @param {string} template
 * @returns {string}
 */
const formateDate = (date, template = 'YYYY-MM-DD H:mm') =>
  dayjs(date).format(template);

/**
 * @param {dayjs.ConfigType} date
 * @returns {string}
 */
const fromNow = date => dayjs(date).fromNow();

/**
 * @param {dayjs.ConfigType} fromDate
 * @param {dayjs.ConfigType} toDate
 * @returns {string}
 */
const fromTo = (fromDate, toDate) => {
  const start = dayjs(fromDate);
  return start.to(dayjs(toDate));
};

/**
 * @param {dayjs.ConfigType} date
 * @param {number} value
 * @param {dayjs.OpUnitType} unit
 * @returns {dayjs.ConfigType}
 */
const addToDate = (date, value, unit = 's') =>
  dayjs(date)
    .add(value, unit)
    .toDate();

/**
 * @param {dayjs.ConfigType} date
 * @returns {number}
 */
const getWeek = date => dayjs(date).week();

/**
 * @param {Date | number | string} value
 * @returns {Date}
 */
const toEqualLocalTime = value => {
  const date = new Date(value);
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const normalizedDate = new Date(date.getTime() + userTimezoneOffset);
  return normalizedDate;
};

/**
 * @param {Date | number | string} value
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

/**
 * @param {Date | number | string} day
 * @returns {Date}
 */
const getStartDay = day => {
  const startDay = new Date(day);
  startDay.setHours(0, 0, 0, 0);
  return startDay;
};

/**
 * @param {Date | number | string} day
 * @returns {Date}
 */
const getEndDay = (day = Date.now()) => {
  const endDay = new Date(day);
  endDay.setHours(23, 59, 59, 999);
  return endDay;
};

module.exports = {
  formateDate,
  fromNow,
  fromTo,
  addToDate,
  getWeek,
  getStartDay,
  getEndDay,
  toEqualLocalTime,
  toDayBeginInUTC,
};
