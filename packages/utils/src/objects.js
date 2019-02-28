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
};
