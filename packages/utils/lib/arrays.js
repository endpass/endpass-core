module.exports.uniq = arr =>
  arr.reduce((acc, item) => (acc.includes(item) ? acc : acc.concat(item)), []);

module.exports.mapArrayByProp = (arr, prop) =>
  arr.reduce((acc, item) => {
    const target = item[prop];

    if (target) {
      return Object.assign(acc, {
        [target]: item,
      });
    }

    return acc;
  }, {});
