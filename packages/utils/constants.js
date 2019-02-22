'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// Parameters for cipher encrypting wallet
var KDF_ENCRYPT_OPTIONS = {
  kdf: 'scrypt',
  n: 8192
};
var constants = {
  KDF_ENCRYPT_OPTIONS: KDF_ENCRYPT_OPTIONS
};

exports.KDF_ENCRYPT_OPTIONS = KDF_ENCRYPT_OPTIONS;
exports.default = constants;
