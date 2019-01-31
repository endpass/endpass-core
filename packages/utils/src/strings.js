module.exports = {
  getShortStringWithEllipsis: (string, symbolsCount = 4) =>
    `${string.slice(0, symbolsCount)}...${string.slice(-symbolsCount)}`,
  matchString: (a, b) => new RegExp(b, 'i').test(a),
};
