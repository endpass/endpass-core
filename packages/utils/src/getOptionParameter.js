module.exports = (item, value) => (item instanceof Object ? item[value] : item);
