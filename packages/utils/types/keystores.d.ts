// Private unexported namespace which visible only within this file
declare namespace _ {
  // Common template type for key stores
  type BasicKeystore = {
    id: string;
    version: 3;

    crypto: {
      cipher: string;
      ciphertext: string;
      cipherparams: {
        iv: string;
      };
      mac: string;
      kdf: string;

      // In the basic key store kdfparams may accept any object value
      // Note that this is common, generic type which should not be used
      // out of bounds of this file
      kdfparams: object;
    };
  };

  // Common template type for addressed keystores
  type BasicAddressedKeystore = {
    address: string;
  } & BasicKeystore;
}

// Keystore types
declare type V3Keystore = {
  crypto: {
    kdfparams: {
      dklen: number;
      n: number;
      r: number;
      p: number;
      salt: string;
    };
  };
} & _.BasicAddressedKeystore;

declare type V3KeystoreWithoutAddress = {
  crypto: {
    kdfparams: {
      dklen: number;
      n: number;
      r: number;
      p: number;
      salt: string;
    };
  };
} & _.BasicKeystore;
