const Bip39 = require('bip39');

/**
 * @returns {string}
 */
const generateSeedKey = () => Bip39.generateMnemonic();

/**
 * @param {string} seedPhrase
 * @returns {Buffer}
 */
const mnemonicToSeedSync = seedPhrase => Bip39.mnemonicToSeedSync(seedPhrase);

module.exports = {
  generateSeedKey,
  mnemonicToSeedSync,
};
