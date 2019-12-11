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

module.exports = {
  formateDate,
  fromNow,
  fromTo,
  addToDate,
  getWeek,
};
