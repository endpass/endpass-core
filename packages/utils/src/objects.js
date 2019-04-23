import get from 'lodash/get';

module.exports = {
  merge: (...obj) => obj.reduce((acc, item) => Object.assign(acc, item), {}),
  getFrom: (target, ...paths) => {
    const existPath = paths.find(path => get(target, path));

    if (!existPath) {
      return null;
    }

    return get(target, existPath);
  },
  parseObjectProperties: (obj, prefix) =>
    Object.keys(obj)
      .filter(key => (prefix ? key.indexOf(prefix) === 0 : true))
      .reduce((parsedObj, key) => {
        try {
          parsedObj[key] = JSON.parse(obj[key]);
        } catch (e) {
          parsedObj[key] = obj[key];
        }
        return parsedObj;
      }, {}),
};
