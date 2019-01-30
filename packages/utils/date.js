const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');

/**
 * Setting up dayjs globally
 */
dayjs.extend(relativeTime);

module.exports = {
  formateDate: date => dayjs(date).format('YYYY-MM-DD H:mm'),
  fromNow: date => dayjs(date).fromNow(),
  fromTo: (fromDate, toDate) => {
    const start = dayjs(fromDate);
    return start.to(dayjs(toDate));
  },
  addToDate: (date, value, unit = 's') => {
    return dayjs(date)
      .add(value, unit)
      .toDate();
  },
};
