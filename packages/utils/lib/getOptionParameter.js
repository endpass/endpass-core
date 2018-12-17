module.exports.getOptionParameter = (item, value) => {
  return item instanceof Object ? item[value] : item;
}
