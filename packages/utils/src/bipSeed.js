const Bip39 = require('bip39');

export default {
  generateSeedKey() {
    return Bip39.generateMnemonic();
  },
  mnemonicToSeedSync(seedPhrase) {
    return Bip39.mnemonicToSeedSync(seedPhrase);
  },
};
