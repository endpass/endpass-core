import Tx from 'ethereumjs-tx';
import HDKey from 'ethereumjs-wallet/hdkey';
import {
  isAddress,
  bytesToHex,
  toChecksumAddress,
  numberToHex,
} from 'web3-utils';
import isV3 from '@endpass/utils/isV3';
import keystoreKeyGen from '@endpass/utils/keystoreKeyGen';
import crypto from '@endpass/utils/crypto';
import { WALLET_TYPE, HARDWARE_WALLET_TYPE } from './types';
import { loadProxy, proxyTypes } from './proxy';
import injectWeb3 from '@/injectWeb3';

const strategies = {
  [WALLET_TYPE.TREZOR]: proxyTypes.TrezorProxy,
  [WALLET_TYPE.LEDGER]: proxyTypes.LedgerProxy,
};

let web3;

/**
 * A Wallet represents a single Ethereum account that can send transactions
 * ! All methods are async and return promises
 * @constructor
 * @param {Object} account Account object
 */
export default class Wallet {
  static set web3(val) {
    web3 = val;
  }

  constructor({ info = {}, ...v3Keystore }) {
    const address = Wallet.normalizeAddress(v3Keystore.address);

    if (!isAddress(address)) {
      throw new Error(`${address} is not valid Etherium address!`);
    }
    const { type: accountType, index } = info;

    if (accountType && !Object.values(WALLET_TYPE).includes(accountType)) {
      console.warn(`${accountType} is not valid Wallet type!`);
      // TODO: Check `HDAccount` type
      // throw new Error(`${accountType} is not valid Wallet type!`);
    }

    const isPublic = !isV3(v3Keystore);
    const isHardware = Object.values(HARDWARE_WALLET_TYPE).includes(
      accountType,
    );

    this.address = address;
    this.index = index;
    this.v3 = isPublic ? null : v3Keystore;
    this.signStrategy = null;
    this.signStrategyName = null;
    this.isPublic = isPublic;
    this.isHardware = isHardware;
    this.type = accountType;

    if (isHardware) {
      this.isPublic = false;
      this.applyHardwareStrategy(accountType);
    }
  }

  /**
   *
   * @param {*} address
   */
  static normalizeAddress(address) {
    if (/^xpub/.test(address)) {
      return Wallet.getAddressFromXpub(address);
    }

    return `0x${address.replace(/^0x/, '')}`;
  }

  /**
   * Returns checksummed address from xpub
   * @param {String} xpub
   * @returns {String} Checksummed address
   */
  static getAddressFromXpub(xpub) {
    const hdWallet = HDKey.fromExtendedKey(xpub);

    return hdWallet.getWallet().getChecksumAddressString();
  }

  /**
   * Applies sign strategy to wallet by given account type
   * If wallet is not supported – throws error
   * @param {String} accountType
   * @throws {Error}
   */
  applyHardwareStrategy(accountType) {
    const strategy = strategies[accountType];
    if (!strategy) {
      throw new Error(`${accountType} hardware wallet is not supported yet!`);
    }
    this.signStrategyName = strategy;
  }

  /**
   * Lazy load strategy and return instance
   */
  async getStrategy() {
    if (!this.signStrategy) {
      this.signStrategy = await loadProxy(this.signStrategyName);
    }
    return this.signStrategy;
  }

  /**
   * Returns decrypted private key buffer
   * @param {String} password Account password
   * @returns {Promise<Buffer>} Private key buffer
   */
  async getPrivateKey(password) {
    return keystoreKeyGen.getPrivateKey(password, this.v3);
  }

  /**
   * Returns decrypted private key in string
   * @param {String} password Account password
   * @returns {Promise<String>} Private key string
   */
  async getPrivateKeyString(password) {
    const privateKey = await this.getPrivateKey(password);

    return bytesToHex(privateKey);
  }

  /**
   * Returns accoutn in JSON string
   * @returns (Promise<String>)
   */
  async exportToJSON() {
    return JSON.stringify(this.v3);
  }

  /**
   * Returns checksummed wallet address
   * @returns {String}
   */
  getChecksumAddressString() {
    return toChecksumAddress(this.address);
  }

  /**
   * Validates account password
   * Throws error on validation failure
   * @param {String} password Account password
   * @throws {Error}
   * @returns {Boolean}
   */
  async validatePassword(password) {
    try {
      await this.getPrivateKey(password);

      return true;
    } catch (e) {
      throw new Error('Invalid password');
    }
  }

  /**
   * Return signed message object
   * @param {String} message Message for signing
   * @return {Promise<Object<SignedMessage>>} Return signed message object
   */
  async sign(data, password) {
    if (this.isHardware) {
      const strategy = await this.getStrategy();
      return strategy.sign(data, this.index);
    }

    const privateKey = await this.getPrivateKeyString(password);

    return web3.eth.accounts.sign(data, privateKey);
  }

  /**
   * Recover account address from signed message/hash
   * @param {String} message Message/hash for signing
   * @param {String<Signature>} signature Signature from signing
   * @return {Promise<Address>} Resolve account address
   */

  /* eslint-disable-next-line */
  async recover(message, signature) {
    return web3.eth.accounts.recover(message, signature);
  }

  /**
   * Return signed transaction hash
   * @param {Transaction} transaction Transaction instance
   * @return {String<SignedTrxHash>} Resolve signed transaction hash
   */
  async signTransaction(transaction, password) {
    if (this.isHardware) {
      const strategy = await this.getStrategy();
      return strategy.signTransaction(transaction, this.index);
    }

    const privateKey = await this.getPrivateKey(password);
    const tx = transaction instanceof Tx ? transaction : new Tx(transaction);

    await tx.sign(privateKey);

    return `0x${tx.serialize().toString('hex')}`;
  }

  /**
   * Return Promise
   * @param {Transaction} transaction Transaction instance
   * @return {String<SignedTrxHash>} Resolve signed transaction hash
   */
  async sendSignedTransaction(transaction, password) {
    const nonce = await this.getNextNonce();

    const signedTx = await this.signTransaction(
      {
        ...transaction,
        nonce: numberToHex(nonce),
      },
      password,
    );

    return new Promise((resolve, reject) => {
      const sendEvent = web3.eth.sendSignedTransaction(signedTx);

      sendEvent.once('transactionHash', trxHash => {
        resolve(trxHash);
      });
      sendEvent.on('error', error => {
        reject(error);
      });
      sendEvent.catch(error => {
        reject(error);
      });
    });
  }

  /**
   *
   * @return {String} Next none
   */
  async getNextNonce() {
    const nonce = await web3.eth.getTransactionCount(this.address);

    return nonce.toString();
  }

  /**
   * Return Wallet Types
   * @return {Object<WALLET_TYPE>} list of types
   */
  static getTypes() {
    return WALLET_TYPE;
  }

  static getProxyTypes() {
    return proxyTypes;
  }

  /**
   * Asynchronous load and return Wallet Proxy class
   * @return {Promise<Proxy>} proxy class
   */
  static loadProxy(name) {
    return loadProxy(name);
  }

  /**
   * Ecnrypts message with wallet public key
   * @param {String} message Message to encrypt in utf8
   * @throws {Error} Message type mismatch
   * @returns {String} Enctypted message in hex string
   */
  async encryptMessageWithPublicKey(message, password) {
    if (typeof message !== 'string') {
      throw new Error('Wallet: message must be a string!');
    }

    const publicKey = keystoreKeyGen.getPublicKey(password, this.v3);

    return crypto.encrypt(message, publicKey);
  }

  /**
   * Decrypts message in hex-string with wallet private key
   * @param {String} message hex string to decrypt
   * @returns {String} Decrypted message
   */
  async decryptMessageWithPrivateKey(message, password) {
    const privateKey = await this.getPrivateKey(password);
    return crypto.decrypt(message, privateKey);
  }
}

const createWalletClass = injectWeb3(Wallet);
export { createWalletClass };
