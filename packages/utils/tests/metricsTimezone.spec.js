import getTimezone from '@/metricsTimezone';

const timeZone = 'Europe/Moscow';
const timezoneOffset = -180;

class DateMock {}

DateMock.prototype.getTimezoneOffset = jest
  .fn()
  .mockReturnValue(timezoneOffset);

const IntlMock = {
  DateTimeFormat: () => ({
    resolvedOptions: () => ({
      timeZone,
    }),
  }),
};

window.Date = DateMock;
window.Intl = IntlMock;

describe('metrics > metricsTimezone', () => {
  it('should return current timezone', () => {
    const tz = getTimezone();

    expect(tz).toEqual({
      timezone: timeZone,
      timezoneOffset,
    });
  });
});
