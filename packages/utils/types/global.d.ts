declare type KeyObject = {
  crypto: {
    cipher: string,
    ciphertext: string,
    cipherparams: {
      iv: string,
    },
    mac: string,
    kdf: string,
    kdfparams: {
      c: number,
      dklen: number,
      prf: string,
      salt: string,
    }
  },
  id: string,
  version: 3,
};

declare type AddressedKeyObject = {
  address: string,
} & KeyObject;

declare type v3Keystore = {
  crypto: {
    kdfparams: {
      dklen: number,
      n: number,
      r: number,
      p: number,
      salt: string,
    }
  },
} & AddressedKeyObject;
