import Bip39 from 'bip39';

export default {
  generateSeedKey() {
    return Bip39.generateMnemonic();
  },
};
