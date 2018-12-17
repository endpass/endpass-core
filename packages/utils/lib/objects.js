const get = require('lodash.get');

module.exports.merge = (...obj) =>
  obj.reduce((acc, item) => Object.assign(acc, item), {});

module.exports.getFrom = (target, ...paths) => {
  const existPath = paths.find(path => get(target, path));

  if (!existPath) {
    return null;
  }

  return get(target, existPath);
};
