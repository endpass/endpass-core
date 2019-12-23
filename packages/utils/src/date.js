const get = require('lodash/get');
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import weekOfYear from 'dayjs/plugin/weekOfYear';


/**
 * Setting up dayjs globally
 */
dayjs.extend(relativeTime);
dayjs.extend(weekOfYear);

const formateDate = (date, template = 'YYYY-MM-DD H:mm') =>
  dayjs(date).format(template);

const fromNow = date => dayjs(date).fromNow();

const fromTo = (fromDate, toDate) => {
  const start = dayjs(fromDate);
  return start.to(dayjs(toDate));
};

const addToDate = (date, value, unit = 's') =>
  dayjs(date)
    .add(value, unit)
    .toDate();

const getWeek = date => dayjs(date).week();

const toEqualLocalTime = value => {
  const date = new Date(value);
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const normalizedDate = new Date(date.getTime() + userTimezoneOffset);
  return normalizedDate;
};

const dayBeginInUTC = value => {
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

const localDateFromApi = (rawObject, fieldName) => {
  const dateValue = get(rawObject, fieldName, null);
  const normalizedDate = dateValue ? toEqualLocalTime(dateValue * 1000) : null;

  return normalizedDate;
};

const localDateToApi = (rawObject, fieldName) => {
  const dateValue = get(rawObject, fieldName, null);

  const utcDate = dayBeginInUTC(dateValue);

  const normalizedDate = utcDate / 1000 || null;
  return normalizedDate;
};

module.exports = {
  formateDate,
  fromNow,
  fromTo,
  addToDate,
  getWeek,
  toEqualLocalTime,
  dayBeginInUTC,
  localDateFromApi,
  localDateToApi,
};
