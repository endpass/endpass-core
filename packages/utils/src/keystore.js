import isV3 from './isV3';
import bs58 from './bs58';
import keystoreHDWallet from './keystoreHDWallet';
import keystoreWallet from './keystoreWallet';
import keystoreCrypto from './keystoreCrypto';
import keystoreHDKeyVerify from './keystoreHDKeyVerify';

module.exports = {
  // Encrypts a private key Buffer into a V3 keystore object
  // The exported keystore does NOT include an address
  encrypt: keystoreCrypto.encrypt,

  // Decrypts a V3 keystore object into a private key Buffer
  decrypt: keystoreCrypto.decrypt,

  // Encrypts an ethereumjs Wallet
  encryptWallet: keystoreWallet.encryptWallet,

  // Decrypts a keystore into an ethereumjs Wallet
  decryptWallet: keystoreWallet.decryptWallet,

  // Encrypts an ethereumjs Wallet
  encryptHDWallet: keystoreHDWallet.encryptHDWallet,

  // Decrypts a keystore into an ethereumjs Wallet
  decryptHDWallet: keystoreHDWallet.decryptHDWallet,

  // Encode a buffer to Base58Check
  // If already a string, silently return it
  encodeBase58: bs58.encodeBase58,

  // Decode from Base58Check string
  // If not a string, silently return it
  decodeBase58: bs58.decodeBase58,

  // Returns true if the key is an extended public key (xpub)
  // Accepts string or buffer
  isExtendedPublicKey: keystoreHDKeyVerify.isExtendedPublicKey,

  // Returns true if the key is an extended private key (xprv)
  // Accepts string or buffer
  isExtendedPrivateKey: keystoreHDKeyVerify.isExtendedPrivateKey,

  // Simple sanity check to ensure a valid V3 keystore
  isV3,
};
