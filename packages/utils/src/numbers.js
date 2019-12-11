const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

const toFixed = num => (!num ? '0' : (num / 100).toFixed(2));

module.exports = {
  isNumeric,
  toFixed,
};
