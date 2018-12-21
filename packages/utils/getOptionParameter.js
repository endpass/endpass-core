module.exports = (item, value) => {
  return item instanceof Object ? item[value] : item;
}
