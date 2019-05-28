export const mnemonic =
  'seed sock milk update focus rotate barely fade car face mechanic mercy';
export const encryptedMnemonic =
  '602df0d02e8ee585f3bc0c63f321411204d02bd8d2c6015e96875324371dae944e24f7401c8ced318774a5907a4dae8ca7a8222c0dc1e4062dd97b46ef53b3f7c133534027431344c7cfd311f2a3c8f603e9ee9b1e907a2b947cbffc936951db75e5474c68fb268d9c8547fda891a431752d37e297d12cece0b924871d61cdedb1df7dbe1a3e06d5231531d889774cf2e5219bba1f4d8a05c619e499b3c399ba0c2cffff48424a4c98dcaa0b222935f396af09328a358758551bcf7928fc7a93e8';
export const xPrvString =
  'xprv9s21ZrQH143K3DAahVuXkkfZxprW7emgvd19zzSEb2zBxR9mWnMFtzGCwmYCq8YQh21ZqFAcPWtWJXz9sbEXaN9LUSe2cjsw9LkAtwmoWsc';
export const xPubString =
  'xpub661MyMwAqRbcFhF3oXSY7tcJWrgzX7VYHqvkoNqr9NXAqDUv4KfWSnago4BMD4yty2cX6f6jLeQefve3nKriVY6c18NLzCmHdKqWeN8VHkJ';

export const privateKey =
  'efca4cdd31923b50f4214af5d2ae10e7ac45a5019e9431cc195482d707485378';

export const address = '0xB14Ab53E38DA1C172f877DBC6d65e4a1B0474C3c';
export const pubAddress =
  'xpub6DojZ5fC8cSLRwc95PFfzUDWUSRod2jSWSbhGKEWFJhoTDiJgRva4am9m7ex1Fm1Ege8MDQ7PNEFqkzdgsRS6UooRfDZpgHkD8vNHiMP3zq';
export const privateAddress =
  'xprv9zpP9a8JJEt3DTXfyMifdLGmvQbKDa1b9Dg6TvptgyApaRPA8tcKWnSfuoQy8yhhPNwrYBXxyW7cs1Auf7yj7XxnCD316XpagBUKx5eHdpY';

export const childAddress = '0x31ea8795EE32D782C8ff41a5C68Dcbf0F5B27f6d';

export const password = 'password123';

export const encryptOptions = {
  kdf: 'scrypt',
  n: 4,
};
export const v3Child = {
  crypto: {
    cipher: 'aes-128-ctr',
    ciphertext:
      '47d033f371e82047878dd67219b925603c3a97d71f28a5065d76e2968b41bdde',
    cipherparams: { iv: '1d6d7796f4ad5dbca4e74827c189f61a' },
    mac: '13261db255d4b3b0a06ce969498ef4b57f4bdad4dd385b8b3b40b2fa9d256a72',
    kdf: 'scrypt',
    kdfparams: {
      dklen: 32,
      n: 4,
      r: 1,
      p: 8,
      salt: '8f296e7ee7a8722319e256d5bfdeb3c63675ea78e1f9efbcd80e925af9be8328',
    },
  },
  id: '821a36f2-3526-44b6-aa60-eed193589ecc',
  version: 3,
  address: '0x31ea8795EE32D782C8ff41a5C68Dcbf0F5B27f6d',
};

export default {
  mnemonic,
  encryptedMnemonic,
  xPrvString,
  xPubString,
  password,
  encryptOptions,
  privateKey,
  address,
  childAddress,
  pubAddress,
  privateAddress,
  v3Child,
};
