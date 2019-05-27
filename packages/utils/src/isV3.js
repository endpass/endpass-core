/**
 * Simple sanity check to ensure a valid V3 keystore
 * @param json
 * @returns {boolean}
 */
export default function(json) {
  return !!(json && json.crypto && json.crypto.ciphertext);
}
