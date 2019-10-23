// Private unexported namespace which visible only within this file
declare namespace private {
  // Common template type for key stores
  type BasicKeyObject = {
    id: string,
    version: 3,

    crypto: {
      cipher: string,
      ciphertext: string,
      cipherparams: {
        iv: string,
      },
      mac: string,
      kdf: string,

      // In the basic key object kdfparams may accept any object value
      // Note that this is common, generic type which should not be used
      // out of bounds of this file
      kdfparams: object,
    },
  };

  // Common template type for addressed keystores
  type BasicAddressedKeyObject = {
    address: string,
  } & BasicKeyObject;
}

declare type KeyObject = {
  crypto: {
    kdfparams: {
      c: number,
      dklen: number,
      prf: string,
      salt: string,
    },
  },
} & private.BasicKeyObject;

declare type AddressedKeyObject = private.BasicAddressedKeyObject & KeyObject;

declare type v3Keystore = {
  crypto: {
    kdfparams: {
      dklen: number,
      n: number,
      r: number,
      p: number,
      salt: string,
    },
  },
} & private.BasicAddressedKeyObject;
