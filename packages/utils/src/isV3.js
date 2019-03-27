// Simple sanity check to ensure a valid V3 keystore
export default function(json) {
  return json && json.crypto && json.crypto.ciphertext;
}
