'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var constants = require('./constants.js');
var keythereum = _interopDefault(require('keythereum'));
var bs58check = _interopDefault(require('bs58check'));
var EthWallet = _interopDefault(require('ethereumjs-wallet'));
var HDKey = _interopDefault(require('ethereumjs-wallet/hdkey'));

// This allows us to encrypt private keys of arbitrary length, and
// conforms better to the Ethereum keystore V3 spec, which does not include
// the address for privacy reasons.
// See https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition#alterations-from-version-1

keythereum.privateKeyToAddress = function (pk) {
  return '';
};

module.exports = {
  // Encrypts a private key Buffer into a V3 keystore object
  // The exported keystore does NOT include an address
  encrypt: function encrypt(password, privateKey) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : constants.KDF_ENCRYPT_OPTIONS;
    // Generate random salt and iv for each encryption
    var dk = keythereum.create();
    var dumpOptions = {
      kdf: options.kdf,
      kdfparams: {
        kdf: options.kdf,
        n: options.n
      }
    };
    var encrypted = keythereum.dump(password, privateKey, dk.salt, dk.iv, dumpOptions);
    delete encrypted.address;
    return encrypted;
  },
  // Decrypts a V3 keystore object into a private key Buffer
  decrypt: function decrypt(password, json) {
    if (!password) {
      throw new Error('Password is empty');
    }

    if (!this.isV3(json)) {
      throw new Error('Wallet is not in keystore V3 format!');
    }

    return keythereum.recover(password, json);
  },
  // Encrypts an ethereumjs Wallet
  encryptWallet: function encryptWallet(password, wallet, encryptOptions) {
    var json = this.encrypt(password, wallet.getPrivateKey(), encryptOptions);
    json.address = wallet.getChecksumAddressString();
    return json;
  },
  // Decrypts a keystore into an ethereumjs Wallet
  decryptWallet: function decryptWallet(password, json) {
    var privateKey = this.decrypt(password, json);
    return EthWallet.fromPrivateKey(privateKey);
  },
  // Encrypts an ethereumjs Wallet
  encryptHDWallet: function encryptHDWallet(password, wallet, encryptOptions) {
    var xPrv = this.decodeBase58(wallet.privateExtendedKey());
    var json = this.encrypt(password, xPrv, encryptOptions);
    json.address = wallet.publicExtendedKey();
    return json;
  },
  // Decrypts a keystore into an ethereumjs Wallet
  decryptHDWallet: function decryptHDWallet(password, json) {
    var xPrv = this.decrypt(password, json);
    var xPrvString = this.encodeBase58(xPrv);
    return HDKey.fromExtendedKey(xPrvString);
  },
  // Encode a buffer to Base58Check
  // If already a string, silently return it
  encodeBase58: function encodeBase58(key) {
    if (typeof key === 'string') {
      return key;
    }

    return bs58check.encode(key);
  },
  // Decode from Base58Check string
  // If not a string, silently return it
  decodeBase58: function decodeBase58(key) {
    if (typeof key !== 'string') {
      return key;
    }

    return bs58check.decode(key);
  },
  // Returns true if the key is an extended public key (xpub)
  // Accepts string or buffer
  isExtendedPublicKey: function isExtendedPublicKey(key) {
    var keyString = this.encodeBase58(key);
    return keyString.slice(0, 4) === 'xpub';
  },
  // Returns true if the key is an extended private key (xprv)
  // Accepts string or buffer
  isExtendedPrivateKey: function isExtendedPrivateKey(key) {
    var keyString = this.encodeBase58(key);
    return keyString.slice(0, 4) === 'xprv';
  },
  // Simple sanity check to ensure a valid V3 keystore
  isV3: function isV3(json) {
    return json && json.crypto && json.crypto.ciphertext;
  }
};
