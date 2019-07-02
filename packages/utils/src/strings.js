module.exports = {
  getShortStringWithEllipsis: (string, symbolsCount = 4) =>
    `${string.slice(0, symbolsCount)}...${string.slice(-symbolsCount)}`,

  matchString: (a, b) => new RegExp(b, 'i').test(a),

  /**
   * Transform hex encoded string to utf8
   * @param {string} str String in hex encoding
   * @returns {string}
   */
  fromHexToUtf8(str) {
    const source = str.replace(/^0x/, '');
    let decodedString = '';

    for (let i = 0; i < source.length; i += 2) {
      decodedString += String.fromCharCode(parseInt(source.substr(i, 2), 16));
    }

    return decodeURIComponent(escape(decodedString));
  },
};
