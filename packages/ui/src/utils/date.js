import dayjs from 'dayjs';
import chunk from 'lodash.chunk';

/**
 * @param {Dayjs} [target]
 * @property {number|string} [params.year]
 * @property {number|string} [params.month]
 * @returns {Array<CalendarDay[]>}
 */
export const getFullCalendarMonth = (target) => {
  const days = [];
  const now = dayjs()
  const targetDate = target || dayjs();
  const targetYear = targetDate.year();
  const targetMonth = targetDate.month();
  const startDay = targetDate.startOf('week');
  const endDay = targetDate.endOf('month').endOf('week');
  let currentDay = startDay.clone();

  while (!currentDay.isAfter(endDay)) {
    days.push(currentDay);
    currentDay = currentDay.add(1, 'day');
  }

  const formattedDays = days.map(day => ({
    origin: day,
    date: day.toDate(),
    formatted: day.format(),
    inTargetMonth: day.month() === targetMonth,
    isToday:
      day.date() === now.date() &&
      day.month() === now.month() &&
      day.year() === now.year(),
  }));

  return chunk(formattedDays, 7);
};

export default {
  getFullCalendarMonth,
}
