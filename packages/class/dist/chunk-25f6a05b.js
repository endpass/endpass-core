import { d as _classCallCheck } from './chunk-350af72f.js';

var NotificationError = function NotificationError(_ref) {
  var title = _ref.title,
      message = _ref.message,
      text = _ref.text,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'is-info' : _ref$type,
      _ref$log = _ref.log,
      log = _ref$log === void 0 ? false : _ref$log;

  _classCallCheck(this, NotificationError);

  if (!title) {
    throw new Error('Notification error needs a title');
  }

  if (!text && !message) {
    throw new Error('Notification error needs a text or message');
  }

  this.name = this.constructor.name;
  this.title = title;
  this.message = message || text;
  this.text = text || message;
  this.type = type;
  this.log = log;

  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error(this.message).stack;
  }
};
NotificationError.prototype = Object.create(Error.prototype);
NotificationError.prototype.constructor = NotificationError;

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

var iterableToArray = _iterableToArray;

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

var arrayWithoutHoles = _arrayWithoutHoles;

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var nonIterableSpread = _nonIterableSpread;

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

var toConsumableArray = _toConsumableArray;

export { NotificationError as a, iterableToArray as b, toConsumableArray as c };
//# sourceMappingURL=chunk-25f6a05b.js.map
