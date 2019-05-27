const get = require('lodash/get');
const identity = require('lodash/identity');

module.exports = (
  object, //
  path,
  predicate = identity,
  timer = 250,
) =>
  new Promise(resolve => {
    /* eslint-disable-next-line */
    const timerId = setInterval(() => {
      const value = get(object, path);

      if (predicate(value)) {
        clearTimeout(timerId);

        return resolve(value);
      }
    }, timer);
  });
