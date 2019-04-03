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
  parseObjectProperties: (obj, prefix) => {
    return Object.keys(obj)
    .filter(key => {
      return prefix ? key.indexOf(prefix) === 0 : true;
    })
    .reduce((parsedObj, key) => {
      parsedObj[key] = JSON.parse(obj[key]);
  	  return parsedObj
    }, {});
  },
};
