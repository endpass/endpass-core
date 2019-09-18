// @ts-check
import { isHexStrict, hexToBytes } from 'web3-utils';
import { keccak256s } from 'eth-lib/lib/hash';
import { sign, decodeSignature } from 'eth-lib/lib/account';

export default class Signer {
  /**
   * Sign data with private key
   * @param {string} data Data for signing
   * @param {string | Buffer} privateKey Private key
   * @returns {{
      message: string,
      messageHash: string,
      v: string,
      r: string,
      s: string,
      signature: string,
    }}
   */
  static sign(data, privateKey) {
    const message = isHexStrict(data) ? hexToBytes(data) : data;
    const privateKeyString = Signer.privateKeyToStr(privateKey);
    // @ts-ignore https://github.com/Microsoft/TypeScript/issues/23155
    const messageBuffer = Buffer.from(message);
    const preamble = `\u0019Ethereum Signed Message:\n${message.length}`;
    const preambleBuffer = Buffer.from(preamble);
    const ethMessage = Buffer.concat([preambleBuffer, messageBuffer]);
    const messageHash = keccak256s(ethMessage);
    const signature = sign(messageHash, privateKeyString);
    const [v, r, s] = decodeSignature(signature);

    return {
      message: data,
      messageHash,
      v,
      r,
      s,
      signature,
    };
  }

  /**
   * Normalize private key to string with valid length
   * @param {string | Buffer} privateKey
   * @returns {string}
   */
  static privateKeyToStr(privateKey) {
    const privateKeyString =
      typeof privateKey === 'string'
        ? privateKey
        : `0x${privateKey.toString('hex')}`;
    const unprefixedPrivateKey = privateKeyString.replace(/^0x/, '');

    return `0x${unprefixedPrivateKey.padStart(64, '0')}`;
  }
}
