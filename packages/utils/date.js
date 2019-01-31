'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var dayjs = _interopDefault(require('dayjs'));
var relativeTime = _interopDefault(require('dayjs/plugin/relativeTime'));

/**
 * Setting up dayjs globally
 */

dayjs.extend(relativeTime);
module.exports = {
  formateDate: function formateDate(date) {
    var template = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD H:mm';
    return dayjs(date).format(template);
  },
  fromNow: function fromNow(date) {
    return dayjs(date).fromNow();
  },
  fromTo: function fromTo(fromDate, toDate) {
    var start = dayjs(fromDate);
    return start.to(dayjs(toDate));
  },
  addToDate: function addToDate(date, value) {
    var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 's';
    return dayjs(date).add(value, unit).toDate();
  }
};
