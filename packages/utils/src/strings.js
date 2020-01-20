// @ts-check

/**
 * @param {string} string
 * @param {number} [symbolsCount]
 * @returns {string}
 */
const getShortStringWithEllipsis = (string, symbolsCount = 4) =>
  `${string.slice(0, symbolsCount)}...${string.slice(-symbolsCount)}`;

/**
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */
const matchString = (a, b) => new RegExp(b, 'i').test(a);

/**
 * Transform hex encoded string to utf8
 * @param {string} str String in hex encoding
 * @returns {string}
 */
const fromHexToUtf8 = str => {
  const source = str.replace(/^0x/, '');
  let decodedString = '';

  for (let i = 0; i < source.length; i += 2) {
    decodedString += String.fromCharCode(parseInt(source.substr(i, 2), 16));
  }

  return decodeURIComponent(escape(decodedString));
};

module.exports = {
  getShortStringWithEllipsis,
  matchString,
  fromHexToUtf8,
};
