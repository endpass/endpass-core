import { dateForUTC } from 'fixtures/date';
import {
  formateDate,
  fromNow,
  fromTo,
  addToDate,
  toEqualLocalTime,
  toDayBeginInUTC,
} from '@/date';

describe('date utils', () => {
  describe('formateDate', () => {
    it('should formate date by YYYY-MM-DD H:mm pattern', () => {
      expect(formateDate(new Date('2016 06 12 12:40'))).toBe(
        '2016-06-12 12:40',
      );
      expect(formateDate(new Date('12:40 2018 06 12'))).toBe(
        '2018-06-12 12:40',
      );
      expect(formateDate(new Date('16:05 06 12 2017'))).toBe(
        '2017-06-12 16:05',
      );
      expect(formateDate(new Date('16:05 06 12 2017'), 'H:mm')).toBe('16:05');
    });
  });

  describe('fromNow', () => {
    const now = new Date();
    const testDates = [
      now.setMinutes(now.getMinutes() - 1),
      now.setHours(now.getHours() - 1),
      now.setDate(now.getDate() - 1),
      now.setMonth(now.getMonth() - 1),
      now.setYear(now.getFullYear() - 1),
    ];

    it('should returns date relative string', () => {
      expect(fromNow(testDates[0])).toBe('a minute ago');
      expect(fromNow(testDates[1])).toBe('an hour ago');
      expect(fromNow(testDates[2])).toBe('a day ago');
      expect(fromNow(testDates[3])).toBe('a month ago');
      expect(fromNow(testDates[4])).toBe('a year ago');
    });
  });

  describe('fromTo', () => {
    const now = new Date();
    const edgeDate = new Date(0);
    const testDates = [
      now.setMinutes(now.getMinutes() + 1),
      now.setHours(now.getHours() + 1),
      now.setDate(now.getDate() + 1),
      now.setMonth(now.getMonth() + 1),
      now.setYear(now.getFullYear() + 1),
      edgeDate.setMinutes(10),
    ];

    it('should returns date relative string', () => {
      const checkNow = Date.now();
      expect(fromTo(checkNow, testDates[0])).toBe('in a minute');
      expect(fromTo(checkNow, testDates[1])).toBe('in an hour');
      expect(fromTo(checkNow, testDates[2])).toBe('in a day');
      expect(fromTo(checkNow, testDates[3])).toBe('in a month');
      expect(fromTo(checkNow, testDates[4])).toBe('in a year');
      expect(fromTo(new Date(0), testDates[5])).toBe('in 10 minutes');
    });
  });

  describe('addToDate', () => {
    const now = Date.now();

    const sec = 1000;
    const min = sec * 60;
    const hour = min * 60;
    const day = hour * 24;

    const testDates = [
      new Date(now + sec * 10),
      new Date(now + min * 4),
      new Date(now + hour * 2),
      new Date(now + day * 56),
    ];

    it('should increment date', () => {
      expect(addToDate(now, 10)).toMatchObject(testDates[0]);
      expect(addToDate(now, 4, 'm')).toMatchObject(testDates[1]);
      expect(addToDate(now, 2, 'h')).toMatchObject(testDates[2]);
      expect(addToDate(now, 56, 'd')).toMatchObject(testDates[3]);
    });
  });

  describe('timezone', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(Date.prototype, 'getTimezoneOffset');
    });

    afterEach(() => {
      spy.mockRestore();
    });

    describe('toEqualLocalTime', () => {
      it('should return correct Date object', () => {
        const result = toEqualLocalTime(dateForUTC.timestamp);

        expect(result).toEqual(dateForUTC.default);
      });

      describe('GMT', () => {
        it('should adopt date with zero GMT', () => {
          spy.mockImplementation(() => 0);
          const result = toEqualLocalTime(dateForUTC.timestamp);

          expect(result).toEqual(dateForUTC.zeroGMT);
        });

        it('should adopt date with positive GMT', () => {
          spy.mockImplementation(() => -180);
          const result = toEqualLocalTime(dateForUTC.timestamp);

          expect(result).toEqual(dateForUTC.positiveGMT);
        });

        it('should adopt date with negative GMT', () => {
          spy.mockImplementation(() => 180);
          const result = toEqualLocalTime(dateForUTC.timestamp);

          expect(result).toEqual(dateForUTC.negativeGMT);
        });
      });
    });
  });

  describe('toDayBeginInUTC', () => {
    it('should return correct timestamp', () => {
      const result = toDayBeginInUTC(dateForUTC.default);

      expect(result).toEqual(dateForUTC.timestamp);
    });
  });
});
