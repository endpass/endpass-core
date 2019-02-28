import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

/**
 * Setting up dayjs globally
 */
dayjs.extend(relativeTime);

module.exports = {
  formateDate: (date, template = 'YYYY-MM-DD H:mm') =>
    dayjs(date).format(template),
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
