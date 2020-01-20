// @ts-check

/**
 * Simple sanity check to ensure a valid V3 keystore
 * @param {object} json
 * @returns {boolean}
 */
const isV3 = json => !!(json && json.crypto && json.crypto.ciphertext);

module.exports = isV3;
