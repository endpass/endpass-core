import { a as _createClass, b as _classCallCheck, c as _asyncToGenerator, d as _regeneratorRuntime, e as createCommonjsModule, f as commonjsGlobal } from './chunk-38bdd081.js';
import namehash from 'eth-ens-namehash';
import { a as _objectSpread, b as _defineProperty$1 } from './chunk-6ea54473.js';
import Tx from 'ethereumjs-tx';
import HDKey from 'ethereumjs-wallet/hdkey';
import { isAddress, toChecksumAddress, bytesToHex, toWei, numberToHex, hexToNumber, fromWei, hexToNumberString } from 'web3-utils';
import { keystore } from '@endpass/utils';
import { a as PROXY_REQUEST_PREFIX, b as BLOCK_UPDATE_INTERVAL_MSEC, c as INPAGE_EVENT, d as INPAGE_ID_PREFIX, e as AVAILABLE_USER_META_PROPS } from './chunk-a7ddc0ba.js';
import { a as NotificationError, b as iterableToArray, c as _toConsumableArray } from './chunk-3552dc45.js';
export { a as NotificationError } from './chunk-3552dc45.js';
import Web3 from 'web3';
import { a as arrayWithHoles, b as nonIterableRest, c as _slicedToArray } from './chunk-e9a09dc5.js';
import HttpProvider from 'web3-providers-http';
import IpcProvider from 'web3-providers-ipc';
import WebsocketProvider from 'web3-providers-ws';
import { BigNumber } from 'bignumber.js';

var injectWeb3 = (function (target) {
  return function (web3) {
    target.web3 = web3;
    return target;
  };
});

var ABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "node",
        "type": "bytes32"
      }
    ],
    "name": "resolver",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "node",
        "type": "bytes32"
      }
    ],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "node",
        "type": "bytes32"
      },
      {
        "name": "resolver",
        "type": "address"
      }
    ],
    "name": "setResolver",
    "outputs": [],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "node",
        "type": "bytes32"
      },
      {
        "name": "label",
        "type": "bytes32"
      },
      {
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "setSubnodeOwner",
    "outputs": [],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "node",
        "type": "bytes32"
      },
      {
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "setOwner",
    "outputs": [],
    "type": "function"
  }
]
;

var web3;
var registryAddresses = {
  // Mainnet
  '1': '0x314159265dd8dbb310642f98f50c066173c1259b',
  // Ropsten
  '3': '0x112234455c3a32fd11230c42e7bccd4a84e02010',
  // Rinkeby
  '4': '0xe7410170f87102DF0055eB195163A03B7F2Bff4A',
  // Ethereum Classic
  '61': '0xb96836a066ef81ea038280c733f833f69c23efde'
};
var addressReg = /^0x[0]{40}$/;

var ENSResolver =
/*#__PURE__*/
function () {
  function ENSResolver() {
    _classCallCheck(this, ENSResolver);
  }

  _createClass(ENSResolver, null, [{
    key: "getAddress",
    value: function () {
      var _getAddress = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(name) {
        var _web3$eth, Contract, net, registryContract, netId, node, address;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _web3$eth = web3.eth, Contract = _web3$eth.Contract, net = _web3$eth.net;
                registryContract = new Contract(ABI);
                _context.next = 4;
                return net.getId();

              case 4:
                netId = _context.sent;
                node = namehash.hash(name);
                Object.assign(registryContract.options, {
                  address: registryAddresses[netId]
                });
                _context.next = 9;
                return registryContract.methods.resolver(node).call();

              case 9:
                address = _context.sent;

                if (!addressReg.test(address)) {
                  _context.next = 12;
                  break;
                }

                throw new Error("Name isn't resolvable");

              case 12:
                return _context.abrupt("return", address);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getAddress(_x) {
        return _getAddress.apply(this, arguments);
      }

      return getAddress;
    }()
  }, {
    key: "web3",
    set: function set(val) {
      web3 = val;
    }
  }]);

  return ENSResolver;
}();
var createENSClass = injectWeb3(ENSResolver);

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var objectWithoutProperties = _objectWithoutProperties;

var HARDWARE_WALLET_TYPE = Object.freeze({
  TREZOR: 'TrezorAccount',
  LEDGER: 'LedgerAccount'
});
var WALLET_TYPE = Object.freeze(_objectSpread({
  STANDART: 'StandardAccount',
  PUBLIC: 'PublicAccount',
  HD_PUBLIC: 'HDPublicAccount',
  HD_MAIN: 'HDMainAccount'
}, HARDWARE_WALLET_TYPE));

var _loaders;

var proxyTypes = {
  TrezorProxy: 'TrezorProxy',
  LedgerProxy: 'LedgerProxy',
  HDProxy: 'HDProxy'
};
var loaders = (_loaders = {}, _defineProperty$1(_loaders, proxyTypes.TrezorProxy, function () {
  return import('./chunk-ad75a11b.js');
}), _defineProperty$1(_loaders, proxyTypes.LedgerProxy, function () {
  return import('./chunk-85860cb9.js');
}), _defineProperty$1(_loaders, proxyTypes.HDProxy, function () {
  return import('./chunk-b23d0e3f.js');
}), _loaders);
var cache = {};
function loadProxy(_x) {
  return _loadProxy.apply(this, arguments);
}

function _loadProxy() {
  _loadProxy = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(name) {
    var mod;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!cache[name]) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", cache[name]);

          case 2:
            _context.next = 4;
            return loaders[name]();

          case 4:
            mod = _context.sent;
            cache[name] = mod.default;
            return _context.abrupt("return", cache[name]);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadProxy.apply(this, arguments);
}

var _strategies;
var strategies = (_strategies = {}, _defineProperty$1(_strategies, WALLET_TYPE.TREZOR, proxyTypes.TrezorProxy), _defineProperty$1(_strategies, WALLET_TYPE.LEDGER, proxyTypes.LedgerProxy), _strategies);
var web3$1;
/**
 * A Wallet represents a single Ethereum account that can send transactions
 * ! All methods are async and return promises
 * @constructor
 * @param {Object} account Account object
 */

var Wallet =
/*#__PURE__*/
function () {
  _createClass(Wallet, null, [{
    key: "web3",
    set: function set(val) {
      web3$1 = val;
    }
  }]);

  function Wallet(_ref) {
    var _ref$info = _ref.info,
        info = _ref$info === void 0 ? {} : _ref$info,
        v3Keystore = objectWithoutProperties(_ref, ["info"]);

    _classCallCheck(this, Wallet);

    var address = Wallet.normalizeAddress(v3Keystore.address);

    if (!isAddress(address)) {
      throw new Error("".concat(address, " is not valid Etherium address!"));
    }

    var accountType = info.type,
        index = info.index;

    if (accountType && !Object.values(WALLET_TYPE).includes(accountType)) {
      console.warn("".concat(accountType, " is not valid Wallet type!")); // TODO: Check `HDAccount` type
      // throw new Error(`${accountType} is not valid Wallet type!`);
    }

    var isPublic = !keystore.isV3(v3Keystore);
    var isHardware = Object.values(HARDWARE_WALLET_TYPE).includes(accountType);
    this.address = address;
    this.index = index;
    this.v3 = isPublic ? null : v3Keystore;
    this.signStrategy = null;
    this.signStrategyName = null;
    this.isPublic = isPublic;
    this.isHardware = isHardware;

    if (isHardware) {
      this.isPublic = false;
      this.applyHardwareStrategy(accountType);
    }
  }
  /**
   *
   * @param {*} address
   */


  _createClass(Wallet, [{
    key: "applyHardwareStrategy",

    /**
     * Applies sign strategy to wallet by given account type
     * If wallet is not supported – throws error
     * @param {String} accountType
     * @throws {Error}
     */
    value: function applyHardwareStrategy(accountType) {
      var strategy = strategies[accountType];

      if (!strategy) {
        throw new Error("".concat(accountType, " hardware wallet is not supported yet!"));
      }

      this.signStrategyName = strategy;
    }
    /**
     * Lazy load strategy and return instance
     */

  }, {
    key: "getStrategy",
    value: function () {
      var _getStrategy = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.signStrategy) {
                  _context.next = 4;
                  break;
                }

                _context.next = 3;
                return loadProxy(this.signStrategyName);

              case 3:
                this.signStrategy = _context.sent;

              case 4:
                return _context.abrupt("return", this.signStrategy);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getStrategy() {
        return _getStrategy.apply(this, arguments);
      }

      return getStrategy;
    }()
    /**
     * Returns decrypted private key buffer
     * @param {String} password Account password
     * @returns {Promise<Buffer>} Private key buffer
     */

  }, {
    key: "getPrivateKey",
    value: function () {
      var _getPrivateKey = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(password) {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", keystore.decrypt(password, this.v3));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getPrivateKey(_x) {
        return _getPrivateKey.apply(this, arguments);
      }

      return getPrivateKey;
    }()
    /**
     * Returns decrypted private key in string
     * @param {String} password Account password
     * @returns {Promise<String>} Private key string
     */

  }, {
    key: "getPrivateKeyString",
    value: function () {
      var _getPrivateKeyString = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(password) {
        var privateKey;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.getPrivateKey(password);

              case 2:
                privateKey = _context3.sent;
                return _context3.abrupt("return", bytesToHex(privateKey));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getPrivateKeyString(_x2) {
        return _getPrivateKeyString.apply(this, arguments);
      }

      return getPrivateKeyString;
    }()
    /**
     * Returns accoutn in JSON string
     * @returns (Promise<String>)
     */

  }, {
    key: "exportToJSON",
    value: function () {
      var _exportToJSON = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4() {
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", JSON.stringify(this.v3));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function exportToJSON() {
        return _exportToJSON.apply(this, arguments);
      }

      return exportToJSON;
    }()
    /**
     * Returns checksummed wallet address
     * @returns {String}
     */

  }, {
    key: "getChecksumAddressString",
    value: function getChecksumAddressString() {
      return toChecksumAddress(this.address);
    }
    /**
     * Validates account password
     * Throws error on validation failure
     * @param {String} password Account password
     * @throws {Error}
     * @returns {Boolean}
     */

  }, {
    key: "validatePassword",
    value: function () {
      var _validatePassword = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(password) {
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return this.getPrivateKey(password);

              case 3:
                return _context5.abrupt("return", true);

              case 6:
                _context5.prev = 6;
                _context5.t0 = _context5["catch"](0);
                throw new Error('Invalid password');

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 6]]);
      }));

      function validatePassword(_x3) {
        return _validatePassword.apply(this, arguments);
      }

      return validatePassword;
    }()
    /**
     * Return signed message object
     * @param {String} message Message for signing
     * @return {Promise<Object<SignedMessage>>} Return signed message object
     */

  }, {
    key: "sign",
    value: function () {
      var _sign = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6(data, password) {
        var privateKey;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this.isHardware) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return", this.getStrategy().sign(data, this.index));

              case 2:
                _context6.next = 4;
                return this.getPrivateKeyString(password);

              case 4:
                privateKey = _context6.sent;
                return _context6.abrupt("return", web3$1.eth.accounts.sign(data, privateKey));

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function sign(_x4, _x5) {
        return _sign.apply(this, arguments);
      }

      return sign;
    }()
    /**
     * Recover account address from signed message/hash
     * @param {String} message Message/hash for signing
     * @param {String<Signature>} signature Signature from signing
     * @return {Promise<Address>} Resolve account address
     */

    /* eslint-disable-next-line */

  }, {
    key: "recover",
    value: function () {
      var _recover = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7(message, signature) {
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", web3$1.eth.accounts.recover(message, signature));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function recover(_x6, _x7) {
        return _recover.apply(this, arguments);
      }

      return recover;
    }()
    /**
     * Return signed transaction hash
     * @param {Transaction} transaction Transaction instance
     * @return {String<SignedTrxHash>} Resolve signed transaction hash
     */

  }, {
    key: "signTransaction",
    value: function () {
      var _signTransaction = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8(transaction, password) {
        var privateKey, tx;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!this.isHardware) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt("return", this.getStrategy().signTransaction(transaction, this.index));

              case 2:
                _context8.next = 4;
                return this.getPrivateKey(password);

              case 4:
                privateKey = _context8.sent;
                tx = transaction instanceof Tx ? transaction : new Tx(transaction);
                _context8.next = 8;
                return tx.sign(privateKey);

              case 8:
                return _context8.abrupt("return", "0x".concat(tx.serialize().toString('hex')));

              case 9:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function signTransaction(_x8, _x9) {
        return _signTransaction.apply(this, arguments);
      }

      return signTransaction;
    }()
    /**
     * Return Promise
     * @param {Transaction} transaction Transaction instance
     * @return {String<SignedTrxHash>} Resolve signed transaction hash
     */

  }, {
    key: "sendSignedTransaction",
    value: function () {
      var _sendSignedTransaction = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9(transaction, password) {
        var nonce, signedTx;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.getNextNonce();

              case 2:
                nonce = _context9.sent;
                _context9.next = 5;
                return this.signTransaction(_objectSpread({}, transaction, {
                  nonce: nonce
                }), password);

              case 5:
                signedTx = _context9.sent;
                return _context9.abrupt("return", new Promise(function (resolve, reject) {
                  var sendEvent = web3$1.eth.sendSignedTransaction(signedTx);
                  sendEvent.then(function (receipt) {
                    return resolve(receipt.transactionHash);
                  });
                  sendEvent.on('error', function (error) {
                    return reject(error);
                  });
                  sendEvent.catch(function (error) {
                    return reject(error);
                  });
                }));

              case 7:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function sendSignedTransaction(_x10, _x11) {
        return _sendSignedTransaction.apply(this, arguments);
      }

      return sendSignedTransaction;
    }()
    /**
     *
     * @return {String} Next none
     */

  }, {
    key: "getNextNonce",
    value: function () {
      var _getNextNonce = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee10() {
        var nonce;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return web3$1.eth.getTransactionCount(this.address);

              case 2:
                nonce = _context10.sent;
                return _context10.abrupt("return", nonce.toString());

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function getNextNonce() {
        return _getNextNonce.apply(this, arguments);
      }

      return getNextNonce;
    }()
    /**
     * Return Wallet Types
     * @return {Object<WALLET_TYPE>} list of types
     */

  }], [{
    key: "normalizeAddress",
    value: function normalizeAddress(address) {
      if (/^xpub/.test(address)) {
        return Wallet.getAddressFromXpub(address);
      }

      return "0x".concat(address.replace(/^0x/, ''));
    }
    /**
     * Returns checksummed address from xpub
     * @param {String} xpub
     * @returns {String} Checksummed address
     */

  }, {
    key: "getAddressFromXpub",
    value: function getAddressFromXpub(xpub) {
      var hdWallet = HDKey.fromExtendedKey(xpub);
      return hdWallet.getWallet().getChecksumAddressString();
    }
  }, {
    key: "getTypes",
    value: function getTypes() {
      return WALLET_TYPE;
    }
  }, {
    key: "getProxyTypes",
    value: function getProxyTypes() {
      return proxyTypes;
    }
    /**
     * Asynchronous load and return Wallet Proxy class
     * @return {Promise<Proxy>} proxy class
     */

  }, {
    key: "loadProxy",
    value: function loadProxy$1(name) {
      return loadProxy(name);
    }
  }]);

  return Wallet;
}();
var createWalletClass = injectWeb3(Wallet);

var erc20ABI = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "who",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "value",
        "type": "uint256"
      },
      {
        "name": "extraData",
        "type": "bytes"
      }
    ],
    "name": "approveAndCall",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "type": "function"
  }
]
;

var Token =
/*#__PURE__*/
function () {
  function Token() {
    _classCallCheck(this, Token);
  }

  _createClass(Token, null, [{
    key: "asObject",
    value: function asObject(_ref) {
      var address = _ref.address,
          logo = _ref.logo,
          name = _ref.name,
          symbol = _ref.symbol,
          _ref$decimals = _ref.decimals,
          decimals = _ref$decimals === void 0 ? 18 : _ref$decimals,
          _ref$balance = _ref.balance,
          balance = _ref$balance === void 0 ? '0' : _ref$balance;

      if (!address) {
        throw new Error("Token can't be created without address!");
      }

      return {
        decimals: parseInt(decimals, 10),
        logo: logo,
        name: name,
        symbol: symbol && symbol.toUpperCase(),
        address: toChecksumAddress(address),
        balance: balance
      };
    }
  }, {
    key: "getConsistent",
    value: function getConsistent(token) {
      return _objectSpread({}, token, {
        address: token.address.toLowerCase()
      });
    }
  }]);

  return Token;
}();

var web3$2; // Service for functions related to ERC20 tokens

var ERC20Token =
/*#__PURE__*/
function () {
  // Accepts a web.js instance and the address of the token contract
  function ERC20Token(address) {
    _classCallCheck(this, ERC20Token);

    this.address = address;
    this.contract = null;
    this.token = null;
  }

  _createClass(ERC20Token, [{
    key: "getContract",
    // Returns the web3.Contract instance for this token
    value: function getContract() {
      if (!this.contract) {
        this.contract = new web3$2.eth.Contract(erc20ABI, this.address);
      }

      return this.contract;
    } // Returns information about the token: name, symbol, decimals, totalSupply

  }, {
    key: "getInfo",
    value: function () {
      var _getInfo = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        var tokenInfo, contract, methods;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                tokenInfo = {};
                contract = this.getContract();
                methods = ['name', 'decimals', 'symbol', 'totalSupply'].map(
                /*#__PURE__*/
                function () {
                  var _ref = _asyncToGenerator(
                  /*#__PURE__*/
                  _regeneratorRuntime.mark(function _callee(item) {
                    return _regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return contract.methods[item]().call();

                          case 3:
                            tokenInfo[item] = _context.sent;
                            _context.next = 9;
                            break;

                          case 6:
                            _context.prev = 6;
                            _context.t0 = _context["catch"](0);
                            tokenInfo[item] = undefined;

                          case 9:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, null, [[0, 6]]);
                  }));

                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }());
                _context2.next = 5;
                return Promise.all(methods);

              case 5:
                return _context2.abrupt("return", tokenInfo);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getInfo() {
        return _getInfo.apply(this, arguments);
      }

      return getInfo;
    }() // Returns a Token class object by fetching ERC20 token info from the blockchain

  }, {
    key: "getToken",
    value: function () {
      var _getToken = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3() {
        var tokenInfo;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.token && this.token.symbol && this.token.decimals)) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", this.token);

              case 2:
                _context3.next = 4;
                return this.getInfo();

              case 4:
                tokenInfo = _context3.sent;
                this.token = Token.asObject(_objectSpread({
                  address: this.address
                }, tokenInfo));
                return _context3.abrupt("return", this.token);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getToken() {
        return _getToken.apply(this, arguments);
      }

      return getToken;
    }()
  }], [{
    key: "getBalance",
    // Returns the balance of this token at an address in wei
    value: function getBalance(accountAddress, tokenAddress) {
      var contract = new web3$2.eth.Contract(erc20ABI, tokenAddress);
      return contract.methods.balanceOf(accountAddress).call();
    }
  }, {
    key: "web3",
    set: function set(val) {
      web3$2 = val;
    }
  }]);

  return ERC20Token;
}();
var createERC20TokenClass = injectWeb3(ERC20Token);

var Decorator =
/*#__PURE__*/
function () {
  function Decorator() {
    var decorators = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Decorator);

    this.setDecorators(decorators);
  }

  _createClass(Decorator, [{
    key: "setDecorators",
    value: function setDecorators(decorators) {
      this.decorators = decorators;
    }
  }, {
    key: "decorate",
    value: function decorate() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.decorators.reduce(function (resultParams, decorator) {
        return decorator.decorate(resultParams);
      }, params);
    }
  }]);

  return Decorator;
}();

var ProviderUrlDecorator =
/*#__PURE__*/
function () {
  function ProviderUrlDecorator(url) {
    _classCallCheck(this, ProviderUrlDecorator);

    this.url = url;
  }

  _createClass(ProviderUrlDecorator, [{
    key: "decorate",
    value: function decorate(params) {
      var _params$url = params.url,
          url = _params$url === void 0 ? '' : _params$url;
      return _objectSpread({}, params, {
        url: "".concat(this.url).concat(url)
      });
    }
  }]);

  return ProviderUrlDecorator;
}();

var PrefixUrlDecorator =
/*#__PURE__*/
function () {
  function PrefixUrlDecorator() {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : PROXY_REQUEST_PREFIX;

    _classCallCheck(this, PrefixUrlDecorator);

    this.prefix = prefix;
  }

  _createClass(PrefixUrlDecorator, [{
    key: "decorate",
    value: function decorate(params) {
      var url = params.url;
      return _objectSpread({}, params, {
        url: "".concat(this.prefix, "-").concat(url)
      });
    }
  }]);

  return PrefixUrlDecorator;
}();

var IDENTITY_MODE = Object.freeze({
  DEFAULT: 'default',
  CUSTOM: 'custom',
  LOCAL: 'local'
});

var privateMethods = {
  add: Symbol('add'),
  read: Symbol('read'),
  write: Symbol('write'),
  remove: Symbol('remove'),
  clear: Symbol('clear')
};

function setDatabase(_x) {
  return _setDatabase.apply(this, arguments);
}

function _setDatabase() {
  _setDatabase = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee7(url) {
    var mod, Database, instance;
    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return import('./chunk-67f50673.js');

          case 2:
            mod = _context7.sent;
            Database = mod.default;
            instance = new Database(url);
            _context7.next = 7;
            return instance.initRoutes();

          case 7:
            return _context7.abrupt("return", instance);

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _setDatabase.apply(this, arguments);
}

var LocalProvider =
/*#__PURE__*/
function () {
  function LocalProvider(serverUrl) {
    _classCallCheck(this, LocalProvider);

    var decorators = [new PrefixUrlDecorator(PROXY_REQUEST_PREFIX)];
    this.decorator = new Decorator(decorators);
    this.url = serverUrl;
  }

  _createClass(LocalProvider, [{
    key: "request",
    value: function () {
      var _request = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(params) {
        var method, newParams, methodName;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                method = params.method;
                newParams = this.decorator.decorate(params);

                if (this.database) {
                  _context.next = 6;
                  break;
                }

                _context.next = 5;
                return setDatabase(this.url);

              case 5:
                this.database = _context.sent;

              case 6:
                methodName = privateMethods[method];
                return _context.abrupt("return", this[methodName](newParams));

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function request(_x2) {
        return _request.apply(this, arguments);
      }

      return request;
    }()
  }, {
    key: privateMethods.add,
    value: function () {
      var _value = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(params) {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.database.request(params);

              case 3:
                return _context2.abrupt("return", {
                  success: true
                });

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                throw new NotificationError({
                  title: 'Error in local database',
                  text: "Can't save data to local database, maybe it is not available",
                  type: 'is-warning'
                });

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 6]]);
      }));

      function value(_x3) {
        return _value.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: privateMethods.read,
    value: function () {
      var _value2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(params) {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                return _context3.abrupt("return", this.database.request(params));

              case 4:
                _context3.prev = 4;
                _context3.t0 = _context3["catch"](0);
                throw new NotificationError({
                  title: 'Error in local database',
                  text: "Can't read data from local database, maybe it is not available",
                  type: 'is-warning'
                });

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 4]]);
      }));

      function value(_x4) {
        return _value2.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: privateMethods.write,
    value: function () {
      var _value3 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4(params) {
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.database.request(params);

              case 3:
                return _context4.abrupt("return", {
                  success: true
                });

              case 6:
                _context4.prev = 6;
                _context4.t0 = _context4["catch"](0);
                throw new NotificationError({
                  title: 'Error in local database',
                  text: "Can't save data to local database, maybe it is not available",
                  type: 'is-warning'
                });

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 6]]);
      }));

      function value(_x5) {
        return _value3.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: privateMethods.remove,
    value: function () {
      var _value4 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(params) {
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return this.database.request(params);

              case 3:
                return _context5.abrupt("return", {
                  success: true
                });

              case 6:
                _context5.prev = 6;
                _context5.t0 = _context5["catch"](0);
                throw new NotificationError({
                  title: 'Error in local database',
                  text: "Can't remove data from local database, maybe it is not available",
                  type: 'is-warning'
                });

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 6]]);
      }));

      function value(_x6) {
        return _value4.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: privateMethods.clear,
    value: function () {
      var _value5 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6() {
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return this.database.clear();

              case 3:
                return _context6.abrupt("return", {
                  success: true
                });

              case 6:
                _context6.prev = 6;
                _context6.t0 = _context6["catch"](0);
                throw new NotificationError({
                  title: 'Error in local database',
                  text: "Can't clear data in the local database, maybe it is not available",
                  type: 'is-warning'
                });

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 6]]);
      }));

      function value() {
        return _value5.apply(this, arguments);
      }

      return value;
    }()
  }]);

  return LocalProvider;
}();

var _privateMethods$add = privateMethods.add;
var _privateMethods$read = privateMethods.read;
var _privateMethods$write = privateMethods.write;
var _privateMethods$remov = privateMethods.remove;
var _privateMethods$clear = privateMethods.clear;

var ServerProvider =
/*#__PURE__*/
function () {
  function ServerProvider(serverUrl, connection) {
    var _this = this;

    _classCallCheck(this, ServerProvider);

    _defineProperty$1(this, _privateMethods$read,
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(params) {
        var url, _ref2, data;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                url = params.url;
                _context.next = 4;
                return _this.connection.get(url);

              case 4:
                _ref2 = _context.sent;
                data = _ref2.data;
                return _context.abrupt("return", data);

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                _context.t0.title = 'Error in server storage';
                _context.t0.text = "Can't read data from server storage, maybe it is not available";
                _context.t0.type = 'is-warning';
                throw _context.t0;

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty$1(this, _privateMethods$write,
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(params) {
        var url, payload, _ref4, data;

        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                url = params.url, payload = params.payload;
                _context2.next = 4;
                return _this.connection.post(url, payload);

              case 4:
                _ref4 = _context2.sent;
                data = _ref4.data;
                return _context2.abrupt("return", data);

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                _context2.t0.title = 'Error in server storage';
                _context2.t0.text = "Can't save data to server storage, maybe it is not available";
                _context2.t0.type = 'is-warning';
                throw _context2.t0;

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty$1(this, _privateMethods$remov,
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(params) {
        var url, payload, _ref6, data;

        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                url = params.url, payload = params.payload;
                _context3.next = 4;
                return _this.connection.delete(url, payload);

              case 4:
                _ref6 = _context3.sent;
                data = _ref6.data;
                return _context3.abrupt("return", data);

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](0);
                _context3.t0.title = 'Error in server storage';
                _context3.t0.text = "Can't remove data from server storage, maybe it is not available";
                _context3.t0.type = 'is-warning';
                throw _context3.t0;

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 9]]);
      }));

      return function (_x3) {
        return _ref5.apply(this, arguments);
      };
    }());

    _defineProperty$1(this, _privateMethods$clear,
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee4() {
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", {
                success: true
              });

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));

    this.url = serverUrl;
    this.connection = connection;
  }

  _createClass(ServerProvider, [{
    key: "request",
    value: function request(params) {
      var method = params.method;
      var methodName = privateMethods[method];
      return this[methodName](params);
    }
  }, {
    key: _privateMethods$add,
    value: function value(params) {
      return this[privateMethods.write](params);
    }
  }]);

  return ServerProvider;
}();

var error = new NotificationError({
  title: 'Error saving account',
  text: 'Not allowed to save account in current mode',
  type: 'is-warning'
});
var privateLocal = {
  localProviderRequest: Symbol('localProviderRequest')
};
var _privateLocal$localPr = privateLocal.localProviderRequest;
var _privateMethods$add$1 = privateMethods.add;
var _privateMethods$read$1 = privateMethods.read;
var _privateMethods$write$1 = privateMethods.write;
var _privateMethods$remov$1 = privateMethods.remove;
var _privateMethods$clear$1 = privateMethods.clear;

var CustomProvider =
/*#__PURE__*/
function () {
  function CustomProvider(serverUrl, connection) {
    _classCallCheck(this, CustomProvider);

    _defineProperty$1(this, _privateMethods$clear$1,
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", {
                success: true
              });

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    this.url = serverUrl;
    this.localProvider = new LocalProvider(serverUrl);
    this.serverProvider = new ServerProvider(serverUrl, connection);
  }

  _createClass(CustomProvider, [{
    key: "request",
    value: function request(params) {
      var method = params.method;
      var methodName = privateMethods[method];
      return this[methodName](params);
    }
  }, {
    key: _privateLocal$localPr,
    value: function value(params) {
      var url = params.url;

      if (url.includes('/account')) {
        throw error;
      }

      return this.localProvider.request(params);
    }
  }, {
    key: _privateMethods$add$1,
    value: function value(params) {
      return this[privateLocal.localProviderRequest](params);
    }
  }, {
    key: _privateMethods$read$1,
    value: function () {
      var _value = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(params) {
        var url;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                url = params.url;

                if (!url.includes('/account')) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", this.serverProvider.request(params));

              case 3:
                return _context2.abrupt("return", this[privateLocal.localProviderRequest](params));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function value(_x) {
        return _value.apply(this, arguments);
      }

      return value;
    }()
  }, {
    key: _privateMethods$write$1,
    value: function value(params) {
      return this[privateLocal.localProviderRequest](params);
    }
  }, {
    key: _privateMethods$remov$1,
    value: function value(params) {
      return this[privateLocal.localProviderRequest](params);
    }
  }]);

  return CustomProvider;
}();

var _map;
var map = (_map = {}, _defineProperty$1(_map, IDENTITY_MODE.CUSTOM, function (url, connection) {
  return new CustomProvider(url, connection);
}), _defineProperty$1(_map, IDENTITY_MODE.LOCAL, function (url, connection) {
  return new LocalProvider(url, connection);
}), _defineProperty$1(_map, IDENTITY_MODE.DEFAULT, function (url, connection) {
  return new ServerProvider(url, connection);
}), _map);
var createProvider = (function (type, url, connection) {
  var createMethod = map[type] || map[IDENTITY_MODE.DEFAULT];
  return createMethod(url, connection);
});

var ProxyRequest =
/*#__PURE__*/
function () {
  function ProxyRequest(connection, defaultIdentityApiUrl) {
    _classCallCheck(this, ProxyRequest);

    this.decorator = new Decorator();
    this.connection = connection;
    this.defaultIdentityApiUrl = defaultIdentityApiUrl;
    this.setMode();
  }

  _createClass(ProxyRequest, [{
    key: "setMode",
    value: function setMode() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : IDENTITY_MODE.DEFAULT;
      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.defaultIdentityApiUrl;
      this.provider = createProvider(type, url, this.connection);
      var decorators = [new ProviderUrlDecorator(url)];
      this.decorator.setDecorators(decorators);
    }
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var params,
            newParams,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};

                if (this.provider) {
                  _context.next = 3;
                  break;
                }

                throw new Error('Provider is not defined, please .setMode() before call request');

              case 3:
                _context.prev = 3;
                newParams = this.decorator.decorate(params);
                _context.next = 7;
                return this.provider.request(newParams);

              case 7:
                return _context.abrupt("return", _context.sent);

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](3);

                if (!(_context.t0.response || _context.t0 instanceof NotificationError)) {
                  _context.next = 14;
                  break;
                }

                throw _context.t0;

              case 14:
                throw new NotificationError({
                  title: _context.t0.title,
                  text: _context.t0.text,
                  type: _context.t0.type
                });

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 10]]);
      }));

      function request() {
        return _request.apply(this, arguments);
      }

      return request;
    }()
  }, {
    key: "add",
    value: function add(url, params) {
      return this.request(_objectSpread({}, params, {
        method: 'add',
        url: url
      }));
    }
  }, {
    key: "read",
    value: function read(url, params) {
      return this.request(_objectSpread({}, params, {
        method: 'read',
        url: url
      }));
    }
  }, {
    key: "write",
    value: function write(url, params) {
      return this.request(_objectSpread({}, params, {
        method: 'write',
        url: url
      }));
    }
  }, {
    key: "remove",
    value: function remove(url, params) {
      return this.request(_objectSpread({}, params, {
        method: 'remove',
        url: url
      }));
    }
  }, {
    key: "clear",
    value: function clear() {
      return this.request({
        method: 'clear'
      });
    }
  }]);

  return ProxyRequest;
}();

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof2(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof2 = function _typeof2(obj) {
      return typeof obj;
    };
  } else {
    _typeof2 = function _typeof2(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof2(obj);
}

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

var EventEmitter =
/*#__PURE__*/
function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.events = {};
  }

  _createClass(EventEmitter, [{
    key: "on",
    value: function on(event, listener) {
      var _this = this;

      if (_typeof_1(this.events[event]) !== 'object') {
        this.events[event] = [];
      }

      this.events[event].push(listener);
      return function () {
        return _this.off(event, listener);
      };
    }
  }, {
    key: "off",
    value: function off(event, listener) {
      if (_typeof_1(this.events[event]) === 'object') {
        var idx = this.events[event].indexOf(listener);

        if (idx > -1) {
          this.events[event].splice(idx, 1);
        }
      }
    }
  }, {
    key: "emit",
    value: function emit(event) {
      var _this2 = this;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (_typeof_1(this.events[event]) === 'object') {
        this.events[event].forEach(function (listener) {
          return listener.apply(_this2, args);
        });
      }
    }
  }, {
    key: "once",
    value: function once(event, listener) {
      var _this3 = this;

      var remove = this.on(event, function () {
        remove();

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        listener.apply(_this3, args);
      });
    }
  }]);

  return EventEmitter;
}();

var Web3Factory =
/*#__PURE__*/
function () {
  function Web3Factory() {
    _classCallCheck(this, Web3Factory);
  }

  _createClass(Web3Factory, null, [{
    key: "create",
    value: function create(provider) {
      var web3 = new Web3();
      web3.setProvider(provider);
      return web3;
    }
  }]);

  return Web3Factory;
}();

function _toArray(arr) {
  return arrayWithHoles(arr) || iterableToArray(arr) || nonIterableRest();
}

var toArray = _toArray;

/** Used for built-in method references. */
var objectProto = Object.prototype;
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */

function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
  return value === proto;
}

var _isPrototype = isPrototype;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */


var nativeKeys = _overArg(Object.keys, Object);
var _nativeKeys = nativeKeys;

/** Used for built-in method references. */


var objectProto$1 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto$1.hasOwnProperty;
/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }

  var result = [];

  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }

  return result;
}

var _baseKeys = baseKeys;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */


var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = _freeGlobal || freeSelf || Function('return this')();
var _root = root;

/** Built-in value references. */


var Symbol$1 = _root.Symbol;
var _Symbol = Symbol$1;

/** Used for built-in method references. */


var objectProto$2 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto$2.toString;
/** Built-in value references. */

var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */

function getRawTag(value) {
  var isOwn = hasOwnProperty$1.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }

  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString$1 = objectProto$3.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */

function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */


var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';
/** Built-in value references. */

var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }

  return symToStringTag$1 && symToStringTag$1 in Object(value) ? _getRawTag(value) : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

/** `Object#toString` result references. */


var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */

function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  } // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.


  var tag = _baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction;

/** Used to detect overreaching core-js shims. */


var coreJsData = _root['__core-js_shared__'];
var _coreJsData = coreJsData;

/** Used to detect methods masquerading as native. */


var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */


function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

var _isMasked = isMasked;

/** Used for built-in method references. */
var funcProto = Function.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */

function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}

var _toSource = toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */


var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */

var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used for built-in method references. */

var funcProto$1 = Function.prototype,
    objectProto$4 = Object.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString$1 = funcProto$1.toString;
/** Used to check objects for own properties. */

var hasOwnProperty$2 = objectProto$4.hasOwnProperty;
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString$1.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */

function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }

  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}

var _baseIsNative = baseIsNative;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */


function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}

var _getNative = getNative;

/* Built-in method references that are verified to be native. */


var DataView = _getNative(_root, 'DataView');
var _DataView = DataView;

/* Built-in method references that are verified to be native. */


var Map = _getNative(_root, 'Map');
var _Map = Map;

/* Built-in method references that are verified to be native. */


var Promise$1 = _getNative(_root, 'Promise');
var _Promise = Promise$1;

/* Built-in method references that are verified to be native. */


var Set = _getNative(_root, 'Set');
var _Set = Set;

/* Built-in method references that are verified to be native. */


var WeakMap = _getNative(_root, 'WeakMap');
var _WeakMap = WeakMap;

/** `Object#toString` result references. */


var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';
var dataViewTag = '[object DataView]';
/** Used to detect maps, sets, and weakmaps. */

var dataViewCtorString = _toSource(_DataView),
    mapCtorString = _toSource(_Map),
    promiseCtorString = _toSource(_Promise),
    setCtorString = _toSource(_Set),
    weakMapCtorString = _toSource(_WeakMap);
/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

var getTag = _baseGetTag; // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.

if (_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag || _Map && getTag(new _Map()) != mapTag || _Promise && getTag(_Promise.resolve()) != promiseTag || _Set && getTag(new _Set()) != setTag || _WeakMap && getTag(new _WeakMap()) != weakMapTag) {
  getTag = function (value) {
    var result = _baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? _toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;

        case mapCtorString:
          return mapTag;

        case promiseCtorString:
          return promiseTag;

        case setCtorString:
          return setTag;

        case weakMapCtorString:
          return weakMapTag;
      }
    }

    return result;
  };
}

var _getTag = getTag;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */


var argsTag = '[object Arguments]';
/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */

function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
}

var _baseIsArguments = baseIsArguments;

/** Used for built-in method references. */


var objectProto$5 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$3 = objectProto$5.hasOwnProperty;
/** Built-in value references. */

var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */

var isArguments = _baseIsArguments(function () {
  return arguments;
}()) ? _baseIsArguments : function (value) {
  return isObjectLike_1(value) && hasOwnProperty$3.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
};
var isArguments_1 = isArguments;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;
var isArray_1 = isArray;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */

function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

var isLength_1 = isLength;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */


function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1(value);
}

var isArrayLike_1 = isArrayLike;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

var isBuffer_1 = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */


var freeExports = exports && !exports.nodeType && exports;
/** Detect free variable `module`. */

var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */

var moduleExports = freeModule && freeModule.exports === freeExports;
/** Built-in value references. */

var Buffer = moduleExports ? _root.Buffer : undefined;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */

var isBuffer = nativeIsBuffer || stubFalse_1;
module.exports = isBuffer;
});

/** `Object#toString` result references. */


var argsTag$1 = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag$1 = '[object Map]',
    numberTag = '[object Number]',
    objectTag$1 = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag$1 = '[object Set]',
    stringTag = '[object String]',
    weakMapTag$1 = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';
/** Used to identify `toStringTag` values of typed arrays. */

var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$1] = typedArrayTags[numberTag] = typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] = typedArrayTags[setTag$1] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag$1] = false;
/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */

function baseIsTypedArray(value) {
  return isObjectLike_1(value) && isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}

var _baseIsTypedArray = baseIsTypedArray;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

var _baseUnary = baseUnary;

var _nodeUtil = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */


var freeExports = exports && !exports.nodeType && exports;
/** Detect free variable `module`. */

var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */

var moduleExports = freeModule && freeModule.exports === freeExports;
/** Detect free variable `process` from Node.js. */

var freeProcess = moduleExports && _freeGlobal.process;
/** Used to access faster Node.js helpers. */

var nodeUtil = function () {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    } // Legacy `process.binding('util')` for Node.js < 10.


    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}();

module.exports = nodeUtil;
});

/* Node.js helper references. */


var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;
/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */

var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;
var isTypedArray_1 = isTypedArray;

/** `Object#toString` result references. */


var mapTag$2 = '[object Map]',
    setTag$2 = '[object Set]';
/** Used for built-in method references. */

var objectProto$6 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$4 = objectProto$6.hasOwnProperty;
/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */

function isEmpty(value) {
  if (value == null) {
    return true;
  }

  if (isArrayLike_1(value) && (isArray_1(value) || typeof value == 'string' || typeof value.splice == 'function' || isBuffer_1(value) || isTypedArray_1(value) || isArguments_1(value))) {
    return !value.length;
  }

  var tag = _getTag(value);

  if (tag == mapTag$2 || tag == setTag$2) {
    return !value.size;
  }

  if (_isPrototype(value)) {
    return !_baseKeys(value).length;
  }

  for (var key in value) {
    if (hasOwnProperty$4.call(value, key)) {
      return false;
    }
  }

  return true;
}

var isEmpty_1 = isEmpty;

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var getPrototypeOf = createCommonjsModule(function (module) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
});

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

var superPropBase = _superPropBase;

var get = createCommonjsModule(function (module) {
function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;
});

var setPrototypeOf = createCommonjsModule(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
});

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

var inherits = _inherits;

/** `Object#toString` result references. */


var symbolTag = '[object Symbol]';
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */

function isSymbol(value) {
  return typeof value == 'symbol' || isObjectLike_1(value) && _baseGetTag(value) == symbolTag;
}

var isSymbol_1 = isSymbol;

/** Used to match property names within property paths. */


var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;
/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */

function isKey(value, object) {
  if (isArray_1(value)) {
    return false;
  }

  var type = typeof value;

  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol_1(value)) {
    return true;
  }

  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}

var _isKey = isKey;

/* Built-in method references that are verified to be native. */


var nativeCreate = _getNative(Object, 'create');
var _nativeCreate = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */


function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete;

/** Used to stand-in for `undefined` hash values. */


var HASH_UNDEFINED = '__lodash_hash_undefined__';
/** Used for built-in method references. */

var objectProto$7 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$5 = objectProto$7.hasOwnProperty;
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function hashGet(key) {
  var data = this.__data__;

  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }

  return hasOwnProperty$5.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;

/** Used for built-in method references. */


var objectProto$8 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$6 = objectProto$8.hasOwnProperty;
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? data[key] !== undefined : hasOwnProperty$6.call(data, key);
}

var _hashHas = hashHas;

/** Used to stand-in for `undefined` hash values. */


var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */

function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = _nativeCreate && value === undefined ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `Hash`.


Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;
var _Hash = Hash;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

var eq_1 = eq;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */


function assocIndexOf(array, key) {
  var length = array.length;

  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }

  return -1;
}

var _assocIndexOf = assocIndexOf;

/** Used for built-in method references. */


var arrayProto = Array.prototype;
/** Built-in value references. */

var splice = arrayProto.splice;
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function listCacheDelete(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }

  var lastIndex = data.length - 1;

  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }

  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function listCacheGet(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */


function listCacheSet(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }

  return this;
}

var _listCacheSet = listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `ListCache`.


ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;
var _ListCache = ListCache;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */


function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash(),
    'map': new (_Map || _ListCache)(),
    'string': new _Hash()
  };
}

var _mapCacheClear = mapCacheClear;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

var _isKeyable = isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */


function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

var _getMapData = getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */


function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
      size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `MapCache`.


MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;
var _MapCache = MapCache;

/** Error message constants. */


var FUNC_ERROR_TEXT = 'Expected a function';
/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */

function memoize(func, resolver) {
  if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  var memoized = function () {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }

    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };

  memoized.cache = new (memoize.Cache || _MapCache)();
  return memoized;
} // Expose `MapCache`.


memoize.Cache = _MapCache;
var memoize_1 = memoize;

/** Used as the maximum memoize cache size. */


var MAX_MEMOIZE_SIZE = 500;
/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */

function memoizeCapped(func) {
  var result = memoize_1(func, function (key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }

    return key;
  });
  var cache = result.cache;
  return result;
}

var _memoizeCapped = memoizeCapped;

/** Used to match property names within property paths. */


var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
/** Used to match backslashes in property paths. */

var reEscapeChar = /\\(\\)?/g;
/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */

var stringToPath = _memoizeCapped(function (string) {
  var result = [];

  if (string.charCodeAt(0) === 46
  /* . */
  ) {
      result.push('');
    }

  string.replace(rePropName, function (match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});
var _stringToPath = stringToPath;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }

  return result;
}

var _arrayMap = arrayMap;

/** Used as references for various `Number` constants. */


var INFINITY = 1 / 0;
/** Used to convert symbols to primitives and strings. */

var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */

function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }

  if (isArray_1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return _arrayMap(value, baseToString) + '';
  }

  if (isSymbol_1(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

var _baseToString = baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */


function toString(value) {
  return value == null ? '' : _baseToString(value);
}

var toString_1 = toString;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */


function castPath(value, object) {
  if (isArray_1(value)) {
    return value;
  }

  return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
}

var _castPath = castPath;

/** Used as references for various `Number` constants. */


var INFINITY$1 = 1 / 0;
/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */

function toKey(value) {
  if (typeof value == 'string' || isSymbol_1(value)) {
    return value;
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY$1 ? '-0' : result;
}

var _toKey = toKey;

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */


function baseGet(object, path) {
  path = _castPath(path, object);
  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[_toKey(path[index++])];
  }

  return index && index == length ? object : undefined;
}

var _baseGet = baseGet;

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */


function get$1(object, path, defaultValue) {
  var result = object == null ? undefined : _baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var get_1 = get$1;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */


var now = function () {
  return _root.Date.now();
};

var now_1 = now;

/** Used as references for various `Number` constants. */


var NAN = 0 / 0;
/** Used to match leading and trailing whitespace. */

var reTrim = /^\s+|\s+$/g;
/** Used to detect bad signed hexadecimal string values. */

var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */

var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */

var reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */

var freeParseInt = parseInt;
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */

function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }

  if (isSymbol_1(value)) {
    return NAN;
  }

  if (isObject_1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject_1(other) ? other + '' : other;
  }

  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }

  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

var toNumber_1 = toNumber;

/** Error message constants. */


var FUNC_ERROR_TEXT$1 = 'Expected a function';
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeMax = Math.max,
    nativeMin = Math.min;
/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */

function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }

  wait = toNumber_1(wait) || 0;

  if (isObject_1(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber_1(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time; // Start the timer for the trailing edge.

    timerId = setTimeout(timerExpired, wait); // Invoke the leading edge.

    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.

    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }

  function timerExpired() {
    var time = now_1();

    if (shouldInvoke(time)) {
      return trailingEdge(time);
    } // Restart the timer.


    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.

    if (trailing && lastArgs) {
      return invokeFunc(time);
    }

    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }

    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now_1());
  }

  function debounced() {
    var time = now_1(),
        isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }

      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }

    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }

    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

var debounce_1 = debounce;

var DebounceMixin = (function (ParentProvider) {
  var DebounceProvider =
  /*#__PURE__*/
  function (_ParentProvider) {
    inherits(DebounceProvider, _ParentProvider);

    function DebounceProvider() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, DebounceProvider);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(DebounceProvider)).call.apply(_getPrototypeOf2, [this].concat(args)));
      _this.cache = {};
      _this.intervalTime = 10000;
      _this.cleanCacheDebounced = debounce_1(_this.cleanCache, 10000, {
        maxWait: 1000
      });
      return _this;
    }

    _createClass(DebounceProvider, [{
      key: "send",
      value: function send() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return this.updateCacheAndSend(args, 'send');
      }
    }, {
      key: "sendAsync",
      value: function sendAsync() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return this.updateCacheAndSend(args, 'sendAsync');
      }
      /**
       * Clean requests cache and handle request sending
       * @param {Array<JSONRPCRequest, callback>} args web3 provider params
       * @param {String} method provider method for request
       */

    }, {
      key: "updateCacheAndSend",
      value: function updateCacheAndSend(args, method) {
        var _this$cache$cacheKey;

        this.cleanCacheDebounced();

        var _args$ = args[0],
            requestId = _args$.id,
            rest = objectWithoutProperties(_args$, ["id"]);

        var payloadStr = JSON.stringify(rest);
        var cacheKey = this.toHashString(payloadStr);

        if (get_1(this, "cache.".concat(cacheKey, ".func"))) {
          this.cache[cacheKey].date = new Date();
          this.cache[cacheKey].buffer.push(args);
        } else {
          this.cache[cacheKey] = {
            date: new Date(),
            func: this.createRequestHandler(cacheKey, method),
            buffer: [args]
          };
        }

        return (_this$cache$cacheKey = this.cache[cacheKey]).func.apply(_this$cache$cacheKey, _toConsumableArray(args));
      }
    }, {
      key: "createRequestHandler",
      value: function createRequestHandler(cacheKey, method) {
        var _this2 = this;

        var send = function send() {
          get(getPrototypeOf(DebounceProvider.prototype), method, _this2).call(_this2, arguments.length <= 0 ? undefined : arguments[0], function (e, result) {
            if (!get_1(_this2, "cache.".concat(cacheKey, ".buffer"))) return;

            var cachedRequestParams = _toConsumableArray(_this2.cache[cacheKey].buffer);

            _this2.cache[cacheKey].buffer = [];
            _this2.cache[cacheKey].func = null;
            cachedRequestParams.forEach(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  payload = _ref2[0],
                  callback = _ref2[1];

              var id = payload.id;
              callback(e, _objectSpread({}, result, {
                id: id
              }));
            });
          });
        };

        return debounce_1(send, 1000, {
          maxWait: 1000
        });
      }
    }, {
      key: "toHashString",
      value: function toHashString(str) {
        var hash = 0;
        var i;
        var chr;
        if (this.length === 0) return hash;

        for (i = 0; i < str.length; i++) {
          chr = str.charCodeAt(i);
          hash = (hash << 5) - hash + chr;
          hash |= 0;
        }

        return hash.toString();
      }
    }, {
      key: "cleanCache",
      value: function cleanCache() {
        var _this3 = this;

        var intervalTime = this.intervalTime;
        var now = new Date();
        Object.keys(this.cache).forEach(function (cacheItem) {
          var date = _this3.cache[cacheItem].date;
          var expirationTime = new Date(date.getTime() + intervalTime);

          if (now > expirationTime) {
            delete _this3.cache[cacheItem];
          }
        });
      }
    }]);

    return DebounceProvider;
  }(ParentProvider);

  return DebounceProvider;
});

var EVENT_TYPES = {
  DATA: 'data',
  ERROR: 'error'
};

var toPayload = function toPayload(id, result) {
  return {
    id: id,
    result: result,
    jsonrpc: '2.0'
  };
};

var SubscriptionMixin = (function (ParentProvider) {
  var SubscriptionProvider =
  /*#__PURE__*/
  function (_ParentProvider) {
    inherits(SubscriptionProvider, _ParentProvider);

    function SubscriptionProvider() {
      var _getPrototypeOf2, _defineProperty2;

      var _this;

      _classCallCheck(this, SubscriptionProvider);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(SubscriptionProvider)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty$1(assertThisInitialized(_this), "notificationCallbacks", (_defineProperty2 = {}, _defineProperty$1(_defineProperty2, EVENT_TYPES.DATA, []), _defineProperty$1(_defineProperty2, EVENT_TYPES.ERROR, function () {}), _defineProperty2));

      _defineProperty$1(assertThisInitialized(_this), "subsrciptionIds", {});

      _defineProperty$1(assertThisInitialized(_this), "newBlocksIntervalId", null);

      return _this;
    }

    _createClass(SubscriptionProvider, [{
      key: "on",
      value: function on(type, callback) {
        if (typeof callback !== 'function') {
          throw new Error('The second parameter callback must be a function.');
        }

        if (type === EVENT_TYPES.DATA) {
          this.notificationCallbacks[type].push(callback);
        } else {
          this.notificationCallbacks[type] = callback;
        }
      }
    }, {
      key: "removeListener",
      value: function removeListener(type, callback) {
        if (type === EVENT_TYPES.DATA) {
          this.notificationCallbacks[EVENT_TYPES.DATA].forEach(function (cb, index, callbacks) {
            if (cb === callback) {
              callbacks.splice(index, 1);
            }
          });
        }
      }
    }, {
      key: "removeAllListeners",
      value: function removeAllListeners(type) {
        if (!type) return;
        this.notificationCallbacks[type] = type === EVENT_TYPES.DATA ? [] : function () {};
      }
    }, {
      key: "reset",
      value: function reset() {
        this.notificationCallbacks = {};
        this.stopPollingNewBlockHeaders();
      }
    }, {
      key: "sendAsync",
      value: function sendAsync(payload, callback) {
        var method = payload.method,
            params = payload.params;

        if (method.indexOf('_subscribe') !== -1) {
          var subscriptionId = Date.now();
          this.subsrciptionIds[subscriptionId] = {
            type: params[0]
          };
          return callback(null, toPayload(payload.id, subscriptionId));
        }

        if (method.indexOf('_unsubscribe') !== -1) {
          delete this.subsrciptionIds[params[0]];
          return callback(null, toPayload(payload.id, true));
        }

        return get(getPrototypeOf(SubscriptionProvider.prototype), "sendAsync", this).call(this, payload, callback);
      }
    }, {
      key: "startPollingNewBlockHeaders",
      value: function startPollingNewBlockHeaders(getBlockNumber, getBlock) {
        var _this2 = this;

        var lastBlockNumber = null;
        if (!getBlockNumber || !getBlock) return;

        if (this.newBlocksIntervalId) {
          this.stopPollingNewBlockHeaders();
        }

        this.newBlocksIntervalId = setInterval(
        /*#__PURE__*/
        _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee() {
          var blockNumber, block;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return getBlockNumber();

                case 3:
                  blockNumber = _context.sent;

                  if (!(lastBlockNumber !== blockNumber)) {
                    _context.next = 12;
                    break;
                  }

                  _context.next = 7;
                  return getBlock(blockNumber);

                case 7:
                  block = _context.sent;

                  if (block) {
                    _context.next = 10;
                    break;
                  }

                  return _context.abrupt("return");

                case 10:
                  lastBlockNumber = blockNumber;

                  _this2.notificationCallbacks[EVENT_TYPES.DATA].forEach(function (callback) {
                    Object.entries(_this2.subsrciptionIds).forEach(function (_ref2) {
                      var _ref3 = _slicedToArray(_ref2, 2),
                          subsrciptionId = _ref3[0],
                          type = _ref3[1].type;

                      if (type === 'newHeads') {
                        callback({
                          method: 'eth_subscribe',
                          params: {
                            subscription: subsrciptionId,
                            result: block
                          }
                        });
                      }
                    });
                  });

                case 12:
                  _context.next = 18;
                  break;

                case 14:
                  _context.prev = 14;
                  _context.t0 = _context["catch"](0);
                  console.error(_context.t0);

                  _this2.notificationCallbacks[EVENT_TYPES.ERROR](_context.t0);

                case 18:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 14]]);
        })), BLOCK_UPDATE_INTERVAL_MSEC);
      }
    }, {
      key: "stopPollingNewBlockHeaders",
      value: function stopPollingNewBlockHeaders() {
        clearInterval(this.newBlocksIntervalId);
        this.newBlocksIntervalId = null;
      }
    }]);

    return SubscriptionProvider;
  }(ParentProvider);

  return SubscriptionProvider;
});

/** Built-in value references. */


var getPrototype = _overArg(Object.getPrototypeOf, Object);
var _getPrototype = getPrototype;

/** `Object#toString` result references. */


var objectTag$2 = '[object Object]';
/** Used for built-in method references. */

var funcProto$2 = Function.prototype,
    objectProto$9 = Object.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString$2 = funcProto$2.toString;
/** Used to check objects for own properties. */

var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
/** Used to infer the `Object` constructor. */

var objectCtorString = funcToString$2.call(Object);
/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */

function isPlainObject(value) {
  if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag$2) {
    return false;
  }

  var proto = _getPrototype(value);

  if (proto === null) {
    return true;
  }

  var Ctor = hasOwnProperty$7.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString$2.call(Ctor) == objectCtorString;
}

var isPlainObject_1 = isPlainObject;

var resolveFunction = function resolveFunction(value) {
  return function () {
    return new Promise(function (resolve) {
      setTimeout(function () {
        return resolve(value);
      });
    });
  };
};

var rejectFunction = function rejectFunction(value) {
  return function () {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        return reject(value);
      });
    });
  };
};

var compareEntriesFunction = function compareEntriesFunction(a, b) {
  var keyA = a[0].toLowerCase();
  var keyB = b[0].toLowerCase();
  return keyA > keyB ? -1 : 1;
};

var replacer = function replacer(key, value) {
  if (!key || !isPlainObject_1(value)) {
    return value;
  }

  var newValue = Object.entries(value).filter(function (item) {
    return item[1] !== undefined;
  }).sort(compareEntriesFunction);
  return JSON.stringify(newValue, replacer);
};

var MockMixin = (function (ParentProvider) {
  var MockProvider =
  /*#__PURE__*/
  function (_ParentProvider) {
    inherits(MockProvider, _ParentProvider);

    function MockProvider() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, MockProvider);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(MockProvider)).call.apply(_getPrototypeOf2, [this].concat(args)));
      _this.mockValues = {};
      _this.mockValuesOnce = {};
      return _this;
    }

    _createClass(MockProvider, [{
      key: "_mockValue",
      value: function _mockValue(_ref, value, mockFunction) {
        var method = _ref.method,
            _ref$params = _ref.params,
            params = _ref$params === void 0 ? [] : _ref$params;
        this.mockValues[JSON.stringify({
          method: method,
          params: params
        }, replacer)] = mockFunction(value);
      }
    }, {
      key: "_mockValueOnce",
      value: function _mockValueOnce(_ref2, value, mockFunction) {
        var method = _ref2.method,
            _ref2$params = _ref2.params,
            params = _ref2$params === void 0 ? [] : _ref2$params;
        var key = JSON.stringify({
          method: method,
          params: params
        }, replacer);
        var mockValueArray = this.mockValuesOnce[key] || [];

        if (mockValueArray.length === 0) {
          this.mockValuesOnce[key] = mockValueArray;
        }

        mockValueArray.push(mockFunction(value));
      }
    }, {
      key: "mockResolvedValue",
      value: function mockResolvedValue(request, response) {
        this._mockValue(request, response, resolveFunction);
      }
    }, {
      key: "mockResolvedValueOnce",
      value: function mockResolvedValueOnce(request, response) {
        this._mockValueOnce(request, response, resolveFunction);
      }
    }, {
      key: "mockRejectedValue",
      value: function mockRejectedValue(request, response) {
        this._mockValue(request, response, rejectFunction);
      }
    }, {
      key: "mockRejectedValueOnce",
      value: function mockRejectedValueOnce(request, response) {
        this._mockValueOnce(request, response, rejectFunction);
      }
    }, {
      key: "send",
      value: function send(payload) {
        console.warn('Unmock sync web3 request', payload);
        return get(getPrototypeOf(MockProvider.prototype), "send", this).call(this, payload);
      }
    }, {
      key: "sendAsync",
      value: function sendAsync(payload, callback) {
        var key = JSON.stringify({
          method: payload.method,
          params: payload.params
        }, replacer);
        var mockValuesOnceArray = this.mockValuesOnce[key];
        var mockValueFunctionOnce = mockValuesOnceArray && mockValuesOnceArray.shift();
        var mockValueFunction = mockValueFunctionOnce || this.mockValues[key];

        if (mockValueFunctionOnce && mockValuesOnceArray.length === 0) {
          delete this.mockValuesOnce[key];
        }

        if (mockValueFunction) {
          mockValueFunction().then(function (value) {
            callback(null, {
              id: payload.id,
              jsonrpc: payload.jsonrpc,
              result: value
            });
          }).catch(function (error) {
            callback(error);
          });
        } else {
          console.warn('Unmock async web3 request', payload);
          callback(null, {
            id: payload.id,
            jsonrpc: payload.jsonrpc,
            result: null
          });
        }
      }
    }]);

    return MockProvider;
  }(ParentProvider);

  return MockProvider;
});

/**
 * Chain mixins and provider class via prototype
 * @param {BaseClass} BaseClass class for apply the mixins
 * @param  {Array<Mixin>} mixins mixins take a base class and return a mixed class
 * @return {MixedClass} mixed class
 */
var applyMixinsToClass = function applyMixinsToClass(BaseClass, mixins) {
  return mixins.reduce(function (MixedClass, mixin) {
    return mixin(MixedClass);
  }, BaseClass);
};

var ProviderFactory =
/*#__PURE__*/
function () {
  function ProviderFactory() {
    _classCallCheck(this, ProviderFactory);
  }

  _createClass(ProviderFactory, null, [{
    key: "getProviderClass",
    value: function getProviderClass(url) {
      HttpProvider.prototype.sendAsync = HttpProvider.prototype.send;
      WebsocketProvider.prototype.sendAsync = WebsocketProvider.prototype.send;
      IpcProvider.prototype.sendAsync = IpcProvider.prototype.send;

      switch (true) {
        case /^(http(s?)):\/\//i.test(url):
          return applyMixinsToClass(HttpProvider, [DebounceMixin, SubscriptionMixin]);

        case /^(ws(s?)):\/\//i.test(url):
          return applyMixinsToClass(WebsocketProvider, [DebounceMixin]);

        case /\.ipc+$/i.test(url):
          return applyMixinsToClass(IpcProvider, [DebounceMixin]);

        default:
          throw new Error('Invalid url or path parameter for the provider');
      }
    }
  }, {
    key: "getInstance",
    value: function getInstance(url) {
      var BaseProvider = ProviderFactory.getProviderClass(url);
      var Provider = window.Cypress ? applyMixinsToClass(BaseProvider, [MockMixin]) : BaseProvider;
      return new Provider(url);
    }
    /**
     * Create an instance of a provider with fallback for a given URL(s)
     * @param {String<Url> | Array<String<Url>>} url Provider url
     * @returns {Provider} Provider instance
     */

  }, {
    key: "create",
    value: function create(url) {
      // For string url
      var _concat = [].concat(url),
          _concat2 = toArray(_concat),
          providerUrl = _concat2[0],
          fallbackUrls = _concat2.slice(1);

      var provider = ProviderFactory.getInstance(providerUrl);

      if (!isEmpty_1(fallbackUrls) && !window.Cypress) {
        provider.getFallbackProviders = function () {
          return fallbackUrls.map(function (urlItem) {
            return ProviderFactory.getInstance(urlItem);
          });
        };
      }

      provider.setErrorHandler = function (handler) {
        if (provider.on) {
          provider.on('error', function (e) {
            return handler(e);
          });
        }
      };

      return provider;
    }
  }]);

  return ProviderFactory;
}();

var InpageProvider =
/*#__PURE__*/
function () {
  function InpageProvider(eventEmitter) {
    var _this = this;

    _classCallCheck(this, InpageProvider);

    _defineProperty$1(this, "enable",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", _this.processPayload({
                method: 'eth_accounts'
              }).result);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    if (!(eventEmitter instanceof EventEmitter)) {
      throw new Error('Event emitter is not provided');
    }

    this.eventEmitter = eventEmitter;
    this.pendingRequestsHandlers = {};
    this.settings = {
      activeAccount: null,
      activeNet: null
    };
    this.isMetaMask = true; // emulate metamask provider

    this.isConnected = function () {
      return true;
    };

    this.setupEventsHandlers();
  }

  _createClass(InpageProvider, [{
    key: "setupEventsHandlers",
    value: function setupEventsHandlers() {
      this.eventEmitter.on(INPAGE_EVENT.SETTINGS, this.handleSettings.bind(this));
      this.eventEmitter.on(INPAGE_EVENT.RESPONSE, this.handleResponse.bind(this));
    }
  }, {
    key: "handleResponse",
    value: function handleResponse(_ref2) {
      var error = _ref2.error,
          id = _ref2.id,
          result = _ref2.result,
          jsonrpc = _ref2.jsonrpc;
      var requestId = InpageProvider.restoreRequestIdFromInpageId(id);
      var requestHandler = get_1(this.pendingRequestsHandlers, requestId);

      if (requestHandler) {
        requestHandler(error, {
          id: parseInt(requestId, 10),
          result: result,
          jsonrpc: jsonrpc
        });
        delete this.pendingRequestsHandlers[requestId];
      }
    }
  }, {
    key: "handleSettings",
    value: function handleSettings(payload) {
      var activeAccount = payload.activeAccount,
          activeNet = payload.activeNet;

      if (activeAccount) {
        this.settings.activeAccount = activeAccount;
      }

      if (activeNet) {
        this.settings.activeNet = activeNet;
      }
    }
  }, {
    key: "processPayload",
    value: function processPayload(payload) {
      var result = null;

      switch (payload.method) {
        case 'eth_accounts':
          result = this.settings.activeAccount ? [this.settings.activeAccount] : [];
          break;

        case 'eth_coinbase':
          result = this.settings.activeAccount || null;
          break;

        case 'eth_uninstallFilter':
          this.sendAsync(payload, function () {});
          result = true;
          break;

        case 'net_version':
          result = this.settings.activeNet || null;
          break;

        default:
          break;
      }

      return {
        id: payload.id,
        jsonrpc: payload.jsonrpc,
        result: result
      };
    }
  }, {
    key: "sendAsync",
    value: function sendAsync(payload, callback) {
      var processedPayload = this.processPayload(_objectSpread({}, payload));

      if (processedPayload.result !== null) {
        callback(null, processedPayload);
      } else {
        this.pendingRequestsHandlers[payload.id] = callback;
        this.eventEmitter.emit(INPAGE_EVENT.REQUEST, _objectSpread({}, payload, {
          id: InpageProvider.createInpageIdFromRequestId(payload.id)
        }));
      }
    }
  }, {
    key: "send",
    value: function send(payload) {
      return this.processPayload(payload);
    }
  }], [{
    key: "createInpageIdFromRequestId",
    value: function createInpageIdFromRequestId(id) {
      return "".concat(INPAGE_ID_PREFIX).concat(id);
    }
  }, {
    key: "restoreRequestIdFromInpageId",
    value: function restoreRequestIdFromInpageId(id) {
      return parseInt(id.replace(INPAGE_ID_PREFIX, ''), 10);
    }
  }]);

  return InpageProvider;
}();

var DappBridge =
/*#__PURE__*/
function (_EventEmitter) {
  inherits(DappBridge, _EventEmitter);

  function DappBridge() {
    var _this;

    _classCallCheck(this, DappBridge);

    for (var _len = arguments.length, props = new Array(_len), _key = 0; _key < _len; _key++) {
      props[_key] = arguments[_key];
    }

    _this = possibleConstructorReturn(this, getPrototypeOf(DappBridge).call(this, props));
    _this.requestHandler = null;

    _this.setupEventsHandlers();

    return _this;
  }

  _createClass(DappBridge, [{
    key: "setupEventsHandlers",
    value: function setupEventsHandlers() {
      this.on(INPAGE_EVENT.REQUEST, this.handleRequest.bind(this));
      this.on(INPAGE_EVENT.SETTINGS, this.handleRequest.bind(this));
    }
  }, {
    key: "setRequestHandler",
    value: function setRequestHandler(handler) {
      this.requestHandler = handler;
    }
  }, {
    key: "handleRequest",
    value: function handleRequest(payload) {
      if (this.requestHandler && payload.id) {
        this.requestHandler(payload);
      }
    }
  }, {
    key: "emitResponse",
    value: function emitResponse(payload) {
      this.emit(INPAGE_EVENT.RESPONSE, payload);
    }
  }, {
    key: "emitSettings",
    value: function emitSettings(payload) {
      this.emit(INPAGE_EVENT.SETTINGS, payload);
    }
  }]);

  return DappBridge;
}(EventEmitter);

var DappBridge$1 = new DappBridge();

var LocalStorage =
/*#__PURE__*/
function () {
  function LocalStorage() {
    _classCallCheck(this, LocalStorage);
  }

  _createClass(LocalStorage, null, [{
    key: "save",
    value: function save(key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }, {
    key: "remove",
    value: function remove(key) {
      localStorage.removeItem(key);
    }
  }, {
    key: "load",
    value: function load(key) {
      var res = localStorage.getItem(key);

      if (res) {
        return JSON.parse(res);
      }

      return null;
    }
  }]);

  return LocalStorage;
}();

var defineProperty = function () {
  try {
    var func = _getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}();

var _defineProperty = defineProperty;

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */


function baseAssignValue(object, key, value) {
  if (key == '__proto__' && _defineProperty) {
    _defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

var _baseAssignValue = baseAssignValue;

/** Used for built-in method references. */


var objectProto$a = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */

function assignValue(object, key, value) {
  var objValue = object[key];

  if (!(hasOwnProperty$8.call(object, key) && eq_1(objValue, value)) || value === undefined && !(key in object)) {
    _baseAssignValue(object, key, value);
  }
}

var _assignValue = assignValue;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;
/** Used to detect unsigned integer values. */

var reIsUint = /^(?:0|[1-9]\d*)$/;
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */

function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

var _isIndex = isIndex;

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */


function baseSet(object, path, value, customizer) {
  if (!isObject_1(object)) {
    return object;
  }

  path = _castPath(path, object);
  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = _toKey(path[index]),
        newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;

      if (newValue === undefined) {
        newValue = isObject_1(objValue) ? objValue : _isIndex(path[index + 1]) ? [] : {};
      }
    }

    _assignValue(nested, key, newValue);
    nested = nested[key];
  }

  return object;
}

var _baseSet = baseSet;

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */


function basePickBy(object, paths, predicate) {
  var index = -1,
      length = paths.length,
      result = {};

  while (++index < length) {
    var path = paths[index],
        value = _baseGet(object, path);

    if (predicate(value, path)) {
      _baseSet(result, _castPath(path, object), value);
    }
  }

  return result;
}

var _basePickBy = basePickBy;

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

var _baseHasIn = baseHasIn;

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */


function hasPath(object, path, hasFunc) {
  path = _castPath(path, object);
  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = _toKey(path[index]);

    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }

    object = object[key];
  }

  if (result || ++index != length) {
    return result;
  }

  length = object == null ? 0 : object.length;
  return !!length && isLength_1(length) && _isIndex(key, length) && (isArray_1(object) || isArguments_1(object));
}

var _hasPath = hasPath;

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */


function hasIn(object, path) {
  return object != null && _hasPath(object, path, _baseHasIn);
}

var hasIn_1 = hasIn;

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 */


function basePick(object, paths) {
  return _basePickBy(object, paths, function (value, path) {
    return hasIn_1(object, path);
  });
}

var _basePick = basePick;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }

  return array;
}

var _arrayPush = arrayPush;

/** Built-in value references. */


var spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;
/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */

function isFlattenable(value) {
  return isArray_1(value) || isArguments_1(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}

var _isFlattenable = isFlattenable;

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */


function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;
  predicate || (predicate = _isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];

    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        _arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }

  return result;
}

var _baseFlatten = baseFlatten;

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */


function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? _baseFlatten(array, 1) : [];
}

var flatten_1 = flatten;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);

    case 1:
      return func.call(thisArg, args[0]);

    case 2:
      return func.call(thisArg, args[0], args[1]);

    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }

  return func.apply(thisArg, args);
}

var _apply = apply;

/* Built-in method references for those with the same name as other `lodash` methods. */


var nativeMax$1 = Math.max;
/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */

function overRest(func, start, transform) {
  start = nativeMax$1(start === undefined ? func.length - 1 : start, 0);
  return function () {
    var args = arguments,
        index = -1,
        length = nativeMax$1(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }

    index = -1;
    var otherArgs = Array(start + 1);

    while (++index < start) {
      otherArgs[index] = args[index];
    }

    otherArgs[start] = transform(array);
    return _apply(func, this, otherArgs);
  };
}

var _overRest = overRest;

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function () {
    return value;
  };
}

var constant_1 = constant;

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

var identity_1 = identity;

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */


var baseSetToString = !_defineProperty ? identity_1 : function (func, string) {
  return _defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant_1(string),
    'writable': true
  });
};
var _baseSetToString = baseSetToString;

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeNow = Date.now;
/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */

function shortOut(func) {
  var count = 0,
      lastCalled = 0;
  return function () {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;

    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }

    return func.apply(undefined, arguments);
  };
}

var _shortOut = shortOut;

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */


var setToString = _shortOut(_baseSetToString);
var _setToString = setToString;

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */


function flatRest(func) {
  return _setToString(_overRest(func, undefined, flatten_1), func + '');
}

var _flatRest = flatRest;

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */


var pick = _flatRest(function (object, paths) {
  return object == null ? {} : _basePick(object, paths);
});
var pick_1 = pick;

var SettingsStorage =
/*#__PURE__*/
function () {
  function SettingsStorage(_ref) {
    var _this = this;

    var storage = _ref.storage,
        _ref$storageKey = _ref.storageKey,
        storageKey = _ref$storageKey === void 0 ? '' : _ref$storageKey;

    _classCallCheck(this, SettingsStorage);

    _defineProperty$1(this, "save", function (key, meta) {
      if (!_this.storage.save) {
        throw new Error('Provided storage does not implements save method!');
      }

      var pickedMeta = pick_1(meta, AVAILABLE_USER_META_PROPS);

      _this.storage.save(_this.getStorageKey(key), pickedMeta);
    });

    _defineProperty$1(this, "load", function (key) {
      if (!_this.storage.load) {
        throw new Error('Provided storage does not implements load method!');
      }

      return _this.storage.load(_this.getStorageKey(key));
    });

    _defineProperty$1(this, "clear", function (key) {
      if (!_this.storage.remove) {
        throw new Error('Provided storage does not implements remove method!');
      }

      _this.storage.remove(_this.getStorageKey(key));
    });

    if (!storage) {
      throw new Error('Settings storage can not be created without storage!');
    }

    this.storageKey = storageKey;
    this.storage = storage;
  }

  _createClass(SettingsStorage, [{
    key: "getStorageKey",
    value: function getStorageKey(key) {
      return "".concat(key, ":").concat(this.storageKey);
    }
  }]);

  return SettingsStorage;
}();

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */


function stackClear() {
  this.__data__ = new _ListCache();
  this.size = 0;
}

var _stackClear = stackClear;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);
  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas;

/** Used as the size to enable large array optimizations. */


var LARGE_ARRAY_SIZE = 200;
/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */

function stackSet(key, value) {
  var data = this.__data__;

  if (data instanceof _ListCache) {
    var pairs = data.__data__;

    if (!_Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }

    data = this.__data__ = new _MapCache(pairs);
  }

  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function Stack(entries) {
  var data = this.__data__ = new _ListCache(entries);
  this.size = data.size;
} // Add methods to `Stack`.


Stack.prototype.clear = _stackClear;
Stack.prototype['delete'] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;
var _Stack = Stack;

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }

  return array;
}

var _arrayEach = arrayEach;

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */


function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }

    if (isNew) {
      _baseAssignValue(object, key, newValue);
    } else {
      _assignValue(object, key, newValue);
    }
  }

  return object;
}

var _copyObject = copyObject;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}

var _baseTimes = baseTimes;

/** Used for built-in method references. */


var objectProto$b = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */

function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value),
      isArg = !isArr && isArguments_1(value),
      isBuff = !isArr && !isArg && isBuffer_1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$9.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
    key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == 'offset' || key == 'parent') || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
    _isIndex(key, length)))) {
      result.push(key);
    }
  }

  return result;
}

var _arrayLikeKeys = arrayLikeKeys;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */


function keys(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}

var keys_1 = keys;

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */


function baseAssign(object, source) {
  return object && _copyObject(source, keys_1(source), object);
}

var _baseAssign = baseAssign;

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];

  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }

  return result;
}

var _nativeKeysIn = nativeKeysIn;

/** Used for built-in method references. */


var objectProto$c = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$a = objectProto$c.hasOwnProperty;
/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

function baseKeysIn(object) {
  if (!isObject_1(object)) {
    return _nativeKeysIn(object);
  }

  var isProto = _isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$a.call(object, key)))) {
      result.push(key);
    }
  }

  return result;
}

var _baseKeysIn = baseKeysIn;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */


function keysIn$1(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
}

var keysIn_1 = keysIn$1;

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */


function baseAssignIn(object, source) {
  return object && _copyObject(source, keysIn_1(source), object);
}

var _baseAssignIn = baseAssignIn;

var _cloneBuffer = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */


var freeExports = exports && !exports.nodeType && exports;
/** Detect free variable `module`. */

var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */

var moduleExports = freeModule && freeModule.exports === freeExports;
/** Built-in value references. */

var Buffer = moduleExports ? _root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;
/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */

function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }

  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;
});

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;
  array || (array = Array(length));

  while (++index < length) {
    array[index] = source[index];
  }

  return array;
}

var _copyArray = copyArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }

  return result;
}

var _arrayFilter = arrayFilter;

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

var stubArray_1 = stubArray;

/** Used for built-in method references. */


var objectProto$d = Object.prototype;
/** Built-in value references. */

var propertyIsEnumerable$1 = objectProto$d.propertyIsEnumerable;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeGetSymbols = Object.getOwnPropertySymbols;
/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */

var getSymbols = !nativeGetSymbols ? stubArray_1 : function (object) {
  if (object == null) {
    return [];
  }

  object = Object(object);
  return _arrayFilter(nativeGetSymbols(object), function (symbol) {
    return propertyIsEnumerable$1.call(object, symbol);
  });
};
var _getSymbols = getSymbols;

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */


function copySymbols(source, object) {
  return _copyObject(source, _getSymbols(source), object);
}

var _copySymbols = copySymbols;

/* Built-in method references for those with the same name as other `lodash` methods. */


var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */

var getSymbolsIn = !nativeGetSymbols$1 ? stubArray_1 : function (object) {
  var result = [];

  while (object) {
    _arrayPush(result, _getSymbols(object));
    object = _getPrototype(object);
  }

  return result;
};
var _getSymbolsIn = getSymbolsIn;

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */


function copySymbolsIn(source, object) {
  return _copyObject(source, _getSymbolsIn(source), object);
}

var _copySymbolsIn = copySymbolsIn;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */


function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */


function getAllKeys(object) {
  return _baseGetAllKeys(object, keys_1, _getSymbols);
}

var _getAllKeys = getAllKeys;

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */


function getAllKeysIn(object) {
  return _baseGetAllKeys(object, keysIn_1, _getSymbolsIn);
}

var _getAllKeysIn = getAllKeysIn;

/** Used for built-in method references. */
var objectProto$e = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$b = objectProto$e.hasOwnProperty;
/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */

function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length); // Add properties assigned by `RegExp#exec`.

  if (length && typeof array[0] == 'string' && hasOwnProperty$b.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }

  return result;
}

var _initCloneArray = initCloneArray;

/** Built-in value references. */


var Uint8Array = _root.Uint8Array;
var _Uint8Array = Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */


function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
  return result;
}

var _cloneArrayBuffer = cloneArrayBuffer;

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */


function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? _cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

var _cloneDataView = cloneDataView;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;
/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */

function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

var _cloneRegExp = cloneRegExp;

/** Used to convert symbols to primitives and strings. */


var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;
/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */

function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

var _cloneSymbol = cloneSymbol;

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */


function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

var _cloneTypedArray = cloneTypedArray;

/** `Object#toString` result references. */


var boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    mapTag$3 = '[object Map]',
    numberTag$1 = '[object Number]',
    regexpTag$1 = '[object RegExp]',
    setTag$3 = '[object Set]',
    stringTag$1 = '[object String]',
    symbolTag$1 = '[object Symbol]';
var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$2 = '[object DataView]',
    float32Tag$1 = '[object Float32Array]',
    float64Tag$1 = '[object Float64Array]',
    int8Tag$1 = '[object Int8Array]',
    int16Tag$1 = '[object Int16Array]',
    int32Tag$1 = '[object Int32Array]',
    uint8Tag$1 = '[object Uint8Array]',
    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
    uint16Tag$1 = '[object Uint16Array]',
    uint32Tag$1 = '[object Uint32Array]';
/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */

function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;

  switch (tag) {
    case arrayBufferTag$1:
      return _cloneArrayBuffer(object);

    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);

    case dataViewTag$2:
      return _cloneDataView(object, isDeep);

    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return _cloneTypedArray(object, isDeep);

    case mapTag$3:
      return new Ctor();

    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);

    case regexpTag$1:
      return _cloneRegExp(object);

    case setTag$3:
      return new Ctor();

    case symbolTag$1:
      return _cloneSymbol(object);
  }
}

var _initCloneByTag = initCloneByTag;

/** Built-in value references. */


var objectCreate = Object.create;
/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */

var baseCreate = function () {
  function object() {}

  return function (proto) {
    if (!isObject_1(proto)) {
      return {};
    }

    if (objectCreate) {
      return objectCreate(proto);
    }

    object.prototype = proto;
    var result = new object();
    object.prototype = undefined;
    return result;
  };
}();

var _baseCreate = baseCreate;

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */


function initCloneObject(object) {
  return typeof object.constructor == 'function' && !_isPrototype(object) ? _baseCreate(_getPrototype(object)) : {};
}

var _initCloneObject = initCloneObject;

/** `Object#toString` result references. */


var mapTag$4 = '[object Map]';
/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */

function baseIsMap(value) {
  return isObjectLike_1(value) && _getTag(value) == mapTag$4;
}

var _baseIsMap = baseIsMap;

/* Node.js helper references. */


var nodeIsMap = _nodeUtil && _nodeUtil.isMap;
/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */

var isMap = nodeIsMap ? _baseUnary(nodeIsMap) : _baseIsMap;
var isMap_1 = isMap;

/** `Object#toString` result references. */


var setTag$4 = '[object Set]';
/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */

function baseIsSet(value) {
  return isObjectLike_1(value) && _getTag(value) == setTag$4;
}

var _baseIsSet = baseIsSet;

/* Node.js helper references. */


var nodeIsSet = _nodeUtil && _nodeUtil.isSet;
/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */

var isSet = nodeIsSet ? _baseUnary(nodeIsSet) : _baseIsSet;
var isSet_1 = isSet;

/** Used to compose bitmasks for cloning. */


var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;
/** `Object#toString` result references. */

var argsTag$2 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    boolTag$2 = '[object Boolean]',
    dateTag$2 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag$2 = '[object Function]',
    genTag$1 = '[object GeneratorFunction]',
    mapTag$5 = '[object Map]',
    numberTag$2 = '[object Number]',
    objectTag$3 = '[object Object]',
    regexpTag$2 = '[object RegExp]',
    setTag$5 = '[object Set]',
    stringTag$2 = '[object String]',
    symbolTag$2 = '[object Symbol]',
    weakMapTag$2 = '[object WeakMap]';
var arrayBufferTag$2 = '[object ArrayBuffer]',
    dataViewTag$3 = '[object DataView]',
    float32Tag$2 = '[object Float32Array]',
    float64Tag$2 = '[object Float64Array]',
    int8Tag$2 = '[object Int8Array]',
    int16Tag$2 = '[object Int16Array]',
    int32Tag$2 = '[object Int32Array]',
    uint8Tag$2 = '[object Uint8Array]',
    uint8ClampedTag$2 = '[object Uint8ClampedArray]',
    uint16Tag$2 = '[object Uint16Array]',
    uint32Tag$2 = '[object Uint32Array]';
/** Used to identify `toStringTag` values supported by `_.clone`. */

var cloneableTags = {};
cloneableTags[argsTag$2] = cloneableTags[arrayTag$1] = cloneableTags[arrayBufferTag$2] = cloneableTags[dataViewTag$3] = cloneableTags[boolTag$2] = cloneableTags[dateTag$2] = cloneableTags[float32Tag$2] = cloneableTags[float64Tag$2] = cloneableTags[int8Tag$2] = cloneableTags[int16Tag$2] = cloneableTags[int32Tag$2] = cloneableTags[mapTag$5] = cloneableTags[numberTag$2] = cloneableTags[objectTag$3] = cloneableTags[regexpTag$2] = cloneableTags[setTag$5] = cloneableTags[stringTag$2] = cloneableTags[symbolTag$2] = cloneableTags[uint8Tag$2] = cloneableTags[uint8ClampedTag$2] = cloneableTags[uint16Tag$2] = cloneableTags[uint32Tag$2] = true;
cloneableTags[errorTag$1] = cloneableTags[funcTag$2] = cloneableTags[weakMapTag$2] = false;
/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */

function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }

  if (result !== undefined) {
    return result;
  }

  if (!isObject_1(value)) {
    return value;
  }

  var isArr = isArray_1(value);

  if (isArr) {
    result = _initCloneArray(value);

    if (!isDeep) {
      return _copyArray(value, result);
    }
  } else {
    var tag = _getTag(value),
        isFunc = tag == funcTag$2 || tag == genTag$1;

    if (isBuffer_1(value)) {
      return _cloneBuffer(value, isDeep);
    }

    if (tag == objectTag$3 || tag == argsTag$2 || isFunc && !object) {
      result = isFlat || isFunc ? {} : _initCloneObject(value);

      if (!isDeep) {
        return isFlat ? _copySymbolsIn(value, _baseAssignIn(result, value)) : _copySymbols(value, _baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }

      result = _initCloneByTag(value, tag, isDeep);
    }
  } // Check for circular references and return its corresponding clone.


  stack || (stack = new _Stack());
  var stacked = stack.get(value);

  if (stacked) {
    return stacked;
  }

  stack.set(value, result);

  if (isSet_1(value)) {
    value.forEach(function (subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
    return result;
  }

  if (isMap_1(value)) {
    value.forEach(function (subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
    return result;
  }

  var keysFunc = isFull ? isFlat ? _getAllKeysIn : _getAllKeys : isFlat ? keysIn : keys_1;
  var props = isArr ? undefined : keysFunc(value);
  _arrayEach(props || value, function (subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    } // Recursively populate clone (susceptible to call stack limits).


    _assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

var _baseClone = baseClone;

/** Used to compose bitmasks for cloning. */


var CLONE_DEEP_FLAG$1 = 1,
    CLONE_SYMBOLS_FLAG$1 = 4;
/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */

function cloneDeep(value) {
  return _baseClone(value, CLONE_DEEP_FLAG$1 | CLONE_SYMBOLS_FLAG$1);
}

var cloneDeep_1 = cloneDeep;

var isNumeric = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var DEFAULT_STRING_INT = '0';
var basicMatches = {
  int: /^\d+$/,
  float: /[-+]?[0-9]*\.?[0-9]*/,
  hex: /0[xX][0-9a-fA-F]+/
};

var intMatcher = function intMatcher(value) {
  return basicMatches.int.test(value);
};

var intFloat = function intFloat(value) {
  return basicMatches.float.test(value);
};

var intHex = function intHex(value) {
  return basicMatches.hex.test(value);
};

var checkUntilValid = function checkUntilValid() {
  for (var _len = arguments.length, rules = new Array(_len), _key = 0; _key < _len; _key++) {
    rules[_key] = arguments[_key];
  }

  return function (value) {
    return rules.reduce(function (res, nextRule) {
      return res || nextRule(value);
    }, false);
  };
};

var isStringifierFloat = checkUntilValid(intFloat, intMatcher, intHex);

function getValue$1(checkVal, matcher) {
  if (matcher(checkVal)) return checkVal;
  console.error('String conversion error. Please check input parameters');
  return DEFAULT_STRING_INT;
}

var Convertor =
/*#__PURE__*/
function () {
  function Convertor() {
    _classCallCheck(this, Convertor);
  }

  _createClass(Convertor, null, [{
    key: "toStringFloat",

    /**
     * Convert Int, Float or Hex value to string in float format
     * val -> int, float, hex(0x<16>)
     * @function
     * @param {String | Integer} val - Int, Float or Hex to convert
     * @returns {String} In float format
     */
    value: function toStringFloat(val) {
      var checkVal = String(val);
      return getValue$1(checkVal, isStringifierFloat);
    }
    /**
     * Convert address to correct checksum address or return as is
     * @function
     * @param {String} addr - address value for convert
     * @returns {String} In address format or as is
     */

  }, {
    key: "toAddress",
    value: function toAddress(addr) {
      // TODO help process to undefined?
      return isAddress(addr) ? toChecksumAddress(addr) : addr;
    }
  }]);

  return Convertor;
}();

var propsMethods = {
  value: Convertor.toStringFloat,
  gasPrice: Convertor.toStringFloat,
  to: Convertor.toAddress,
  from: Convertor.toAddress
};

function setProp(trx, key, value) {
  var method = propsMethods[key];

  if (method) {
    trx[key] = method(value);
  } else if (trx.hasOwnProperty(key)) {
    trx[key] = value;
  } else {
    console.warn('Trying to apply not defined key in trx structure');
  }
}

function applyProps(trx, newProps) {
  // apply first props if they defined, then call others
  var nextProps = _objectSpread({}, newProps); // must set before other props. Other props have dependency from token value


  if (nextProps.hasOwnProperty('token')) {
    trx.token = nextProps.token && Token.asObject(nextProps.token);
    delete nextProps.token;
  }

  for (var key in nextProps) {
    setProp(trx, key, nextProps[key]);
  }

  Object.freeze(trx);
  return trx;
}

var DEFAULT_ZERO = '0';

var Transaction =
/*#__PURE__*/
function () {
  function Transaction() {
    _classCallCheck(this, Transaction);
  }

  _createClass(Transaction, null, [{
    key: "create",
    value: function create(_ref) {
      var data = _ref.data,
          from = _ref.from,
          _ref$gasPrice = _ref.gasPrice,
          gasPrice = _ref$gasPrice === void 0 ? '90' : _ref$gasPrice,
          _ref$gasLimit = _ref.gasLimit,
          gasLimit = _ref$gasLimit === void 0 ? '22000' : _ref$gasLimit,
          hash = _ref.hash,
          input = _ref.input,
          nonce = _ref.nonce,
          _ref$state = _ref.state,
          state = _ref$state === void 0 ? 'success' : _ref$state,
          timestamp = _ref.timestamp,
          _ref$to = _ref.to,
          to = _ref$to === void 0 ? '' : _ref$to,
          _ref$networkId = _ref.networkId,
          networkId = _ref$networkId === void 0 ? 1 : _ref$networkId,
          _ref$token = _ref.token,
          token = _ref$token === void 0 ? undefined : _ref$token,
          transactionHash = _ref.transactionHash,
          _ref$value = _ref.value,
          value = _ref$value === void 0 ? DEFAULT_ZERO : _ref$value,
          success = _ref.success;
      // prepare external structure
      var trx = {
        token: token,
        from: from,
        to: to,
        networkId: networkId,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        nonce: nonce,
        // dependency from other props
        data: data || input,
        hash: hash || transactionHash,
        state: success === false ? 'error' : state,
        date: timestamp && new Date(timestamp * 1000),
        // calculated
        value: DEFAULT_ZERO
      };

      applyProps(trx, {
        value: value,
        from: from,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        to: to
      });

      return trx;
    }
  }, {
    key: "applyProps",
    value: function applyProps$1(trx, newProps) {
      var res = Transaction.unfreeze(trx);

      applyProps(res, newProps);

      return res;
    }
  }, {
    key: "unfreeze",
    value: function unfreeze(trx) {
      return _objectSpread({}, trx);
    }
  }, {
    key: "clone",
    value: function clone(trx) {
      return cloneDeep_1(trx);
    }
  }, {
    key: "isEqual",
    value: function isEqual(trx1, trx2) {
      var fields = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['networkId', 'hash'];
      return fields.every(function (field) {
        return trx1[field] === trx2[field];
      });
    }
  }, {
    key: "getMultiplier",
    value: function getMultiplier(token) {
      var decimals = token ? token.decimals || 0 : 18;
      return BigNumber('10').pow(decimals);
    }
  }, {
    key: "getTokenSymbol",
    value: function getTokenSymbol(trx) {
      var token = trx.token;
      return get_1(token, 'symbol', 'ETH');
    }
  }, {
    key: "getGasCost",
    value: function getGasCost(_ref2) {
      var gasLimit = _ref2.gasLimit,
          gasPrice = _ref2.gasPrice;
      var gasPriceWei = Transaction.getGasPriceWei(gasPrice);
      return BigNumber(gasPriceWei).times(gasLimit);
    }
  }, {
    key: "getFullCost",
    value: function getFullCost(trx) {
      var token = trx.token;
      var gasCost = Transaction.getGasCost(trx);
      var tnxValue = !token ? Transaction.getValueInWei(trx) : DEFAULT_ZERO;
      return BigNumber(gasCost).plus(tnxValue);
    }
  }, {
    key: "getUpGasPrice",
    value: function getUpGasPrice(_ref3) {
      var gasPrice = _ref3.gasPrice;
      return BigNumber(gasPrice).plus('10').integerValue(BigNumber.ROUND_CEIL);
    }
  }, {
    key: "getGasPriceWei",
    value: function getGasPriceWei(price) {
      var value = price && price.toString();
      return !isNumeric(value) ? DEFAULT_ZERO : toWei(value, 'gwei');
    }
  }, {
    key: "getValidTo",
    value: function getValidTo(transaction) {
      var to = transaction.to;

      if (!to) {
        return undefined;
      }

      if (isAddress(to)) {
        return to;
      }

      return "0x".concat(to);
    }
  }, {
    key: "getValidData",
    value: function getValidData(transaction) {
      var data = transaction.data,
          token = transaction.token;

      if (!token) {
        return data;
      }

      var validTo = Transaction.getValidTo(transaction);
      var erc20 = new ERC20Token(token.address);
      var contract = erc20.getContract();
      var transactionValueInWei = Transaction.getValueInWei(transaction);
      return contract.methods.transfer(validTo, transactionValueInWei).encodeABI();
    }
  }, {
    key: "getPriceWei",
    value: function getPriceWei(transaction) {
      return Transaction.getGasPriceWei(transaction.gasPrice);
    }
  }, {
    key: "getValueBN",
    value: function getValueBN(transaction) {
      var value = transaction.value;

      if (!isNumeric(value)) {
        return BigNumber(DEFAULT_ZERO);
      }

      return BigNumber(value);
    }
  }, {
    key: "getValueInWei",
    value: function getValueInWei(transaction) {
      var multiplier = Transaction.getMultiplier(transaction.token);
      return Transaction.getValueBN(transaction).times(multiplier).toFixed(0);
    }
  }, {
    key: "getValueFromWei",
    value: function getValueFromWei(transaction) {
      var multiplier = Transaction.getMultiplier(transaction.token);
      return Transaction.getValueBN(transaction).div(multiplier).toFixed();
    }
  }, {
    key: "getApiObject",
    value: function getApiObject(trx) {
      var data = Transaction.getValidData(trx);
      var validTo = Transaction.getValidTo(trx);
      var gasPriceWei = Transaction.getPriceWei(trx);
      var valueWei = Transaction.getValueInWei(trx);
      var token = trx.token;
      var tokenPassData = token ? {
        to: token.address,
        value: '0x0'
      } : {};
      return _objectSpread({
        from: trx.from,
        to: validTo,
        gasPrice: numberToHex(gasPriceWei),
        value: numberToHex(valueWei),
        gasLimit: numberToHex(trx.gasLimit || 0),
        nonce: numberToHex(trx.nonce),
        data: data
      }, tokenPassData);
    }
  }]);

  return Transaction;
}();

var TransactionFactory =
/*#__PURE__*/
function () {
  function TransactionFactory() {
    _classCallCheck(this, TransactionFactory);
  }

  _createClass(TransactionFactory, null, [{
    key: "fromSendForm",
    value: function fromSendForm(trx) {
      var value = trx.token ? Transaction.getValueFromWei(trx) : trx.value;
      return Transaction.create(_objectSpread({}, trx, {
        value: value
      }));
    }
  }, {
    key: "fromBlock",
    value: function fromBlock(trx) {
      var gasPrice = trx.gasPrice,
          nonce = trx.nonce,
          chainId = trx.chainId,
          networkId = trx.networkId;
      var adaptData = {
        networkId: chainId ? hexToNumber(chainId) : networkId,
        value: Transaction.getValueFromWei(trx),
        timestamp: new Date().getTime() / 1000,
        nonce: String(nonce),
        gasPrice: fromWei(gasPrice, 'Gwei')
      };
      return Transaction.create(_objectSpread({}, trx, adaptData));
    }
  }, {
    key: "fromRequestParams",
    value: function fromRequestParams(trx) {
      var value = trx.value,
          gasPrice = trx.gasPrice,
          gas = trx.gas;
      var adaptData = {};

      if (value) {
        adaptData.value = fromWei(hexToNumberString(value));
      }

      if (gasPrice) {
        adaptData.gasPrice = fromWei(hexToNumberString(gasPrice), 'Gwei');
      }

      if (gas) {
        adaptData.gasLimit = hexToNumberString(gas);
      }

      return Transaction.create(_objectSpread({}, trx, adaptData));
    }
  }, {
    key: "fromCryptoData",
    value: function fromCryptoData(trx) {
      return Transaction.create(_objectSpread({}, trx, {
        value: fromWei(trx.value),
        nonce: hexToNumberString(trx.nonce),
        gasPrice: fromWei(trx.gasPrice, 'Gwei'),
        gasLimit: hexToNumberString(trx.gas),
        networkId: hexToNumber(trx.chainId),
        timestamp: hexToNumber(trx.timestamp)
      }));
    }
  }]);

  return TransactionFactory;
}();

// classes WITH web3 instance inject dependency

export { createENSClass, createWalletClass, createERC20TokenClass, ProxyRequest, EventEmitter, Web3Factory, ProviderFactory, InpageProvider, DappBridge$1 as DappBridge, LocalStorage, SettingsStorage, Transaction, TransactionFactory, Token };
