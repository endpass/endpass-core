import { isHexStrict, hexToBytes } from 'web3-utils';
import { keccak256s } from 'eth-lib/lib/hash';
import {
  sign,
  decodeSignature,
  recover,
  encodeSignature,
} from 'eth-lib/lib/account';

export default class Signer {
  static sign(data, privateKey) {
    const messageHash = Signer.hashMessage(data);
    const privateKeyString = Signer.privateKeyToStr(privateKey);
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

  static hashMessage(data) {
    const message = isHexStrict(data) ? hexToBytes(data) : data;
    // @ts-ignore https://github.com/Microsoft/TypeScript/issues/23155
    const messageBuffer = Buffer.from(message);
    const preamble = `\u0019Ethereum Signed Message:\n${message.length}`;
    const preambleBuffer = Buffer.from(preamble);
    const ethMessage = Buffer.concat([preambleBuffer, messageBuffer]);
    const messageHash = keccak256s(ethMessage);
    return messageHash;
  }

  static recover(message, signature, preFixed) {
    if (typeof message === 'object') {
      return Signer.recover(
        message.messageHash,
        encodeSignature([message.v, message.r, message.s]),
        true,
      );
    }

    if (arguments.length >= 4) {
      // arguments struct -> (message, v, r, s, preFixed)
      // eslint-disable-next-line
      const args = [].slice.apply(arguments);
      const preFixedValue = args.slice(-1)[0];
      const newPreFixed =
        typeof preFixedValue === 'boolean' ? preFixedValue : false;
      return Signer.recover(
        message,
        encodeSignature(args.slice(1, 4)),
        newPreFixed,
      );
    }

    const recoverMessage = preFixed ? message : Signer.hashMessage(message);
    return recover(recoverMessage, signature);
  }

  static privateKeyToStr(privateKey) {
    const privateKeyString =
      typeof privateKey === 'string'
        ? privateKey
        : `0x${privateKey.toString('hex')}`;
    const unprefixedPrivateKey = privateKeyString.replace(/^0x/, '');

    return `0x${unprefixedPrivateKey.padStart(64, '0')}`;
  }
}
