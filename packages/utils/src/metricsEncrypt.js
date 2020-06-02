// @ts-check

/**
 * Encodes given data with btoa
 * @param {any} data
 * @returns {string}
 */
const encryptMetric = data =>
  btoa(unescape(encodeURIComponent(JSON.stringify(data))));

export default encryptMetric;
