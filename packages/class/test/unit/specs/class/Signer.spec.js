import { message, signResult, signature, signAddress } from 'fixtures/sign';
import { privateKeyImport } from 'fixtures/accounts';
import Signer from '@/Signer';

describe('Signer', () => {
  const privateKeyBuffer = Buffer.from(
    privateKeyImport.replace(/^0x/, ''),
    'hex',
  );
  const privateKeyBadLengthForBuffer = privateKeyImport
    .replace(/^0x0/, '')
    .replace(/^/, '0x');

  describe('privateKeyToStr', () => {
    it('should return valid private key string', () => {
      const res = Signer.privateKeyToStr(privateKeyImport);
      const res1 = Signer.privateKeyToStr(privateKeyBuffer);
      const res2 = Signer.privateKeyToStr(privateKeyImport);
      const res3 = Signer.privateKeyToStr(privateKeyBadLengthForBuffer);

      expect(res).toEqual(privateKeyImport);
      expect(res1).toEqual(privateKeyImport);
      expect(res2).toEqual(privateKeyImport);
      expect(res3).toEqual(privateKeyImport);
    });
  });

  describe('sign', () => {
    it('should sign message with private key as string', () => {
      const res = Signer.sign(message, privateKeyImport);

      expect(res).toEqual(signResult);
    });

    it('should sign message with private key as Buffer', () => {
      const res = Signer.sign(message, privateKeyBuffer);

      expect(res).toEqual(signResult);
    });

    it('should sign message with private key with bad length', () => {
      const res = Signer.sign(message, privateKeyBadLengthForBuffer);

      expect(res).toEqual(signResult);
    });
  });

  describe('recover', () => {
    it('should recover message as object', () => {
      const res = Signer.recover(signResult);

      expect(res).toEqual(signAddress);
    });

    it('should recover message as [v,r,s] signature', () => {
      const res = Signer.recover(
        signResult.messageHash,
        signResult.v,
        signResult.r,
        signResult.s,
        true,
      );

      expect(res).toEqual(signAddress);
    });

    it('should recover message as default with prefixed', () => {
      const res = Signer.recover(signResult.messageHash, signature, true);

      expect(res).toEqual(signAddress);
    });

    it('should recover message as default without prefixed', () => {
      const res = Signer.recover(signResult.message, signature);

      expect(res).toEqual(signAddress);
    });
  });
});
