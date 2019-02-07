import { a as _createClass, b as _asyncToGenerator, c as _regeneratorRuntime, d as _classCallCheck } from './chunk-350af72f.js';
import { a as _objectSpread } from './chunk-96639b88.js';
import Tx from 'ethereumjs-tx';
import HDKey from 'ethereumjs-wallet/hdkey';
import { sha3, toDecimal, toHex } from 'web3-utils';
import { e as HARDWARE_DERIVIATION_PATH } from './chunk-b4810d43.js';
import { a as NotificationError } from './chunk-25f6a05b.js';
import TrezorConnect from 'trezor-connect';
import { a as getChildrenAddress } from './chunk-ade9ee03.js';

var TrezorProxy =
/*#__PURE__*/
function () {
  function TrezorProxy() {
    _classCallCheck(this, TrezorProxy);
  }

  _createClass(TrezorProxy, null, [{
    key: "getNextWallets",
    value: function () {
      var _getNextWallets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(_ref) {
        var _ref$offset, offset, _ref$limit, limit, savedXpub, xpub, hdWallet, addresses;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref$offset = _ref.offset, offset = _ref$offset === void 0 ? 0 : _ref$offset, _ref$limit = _ref.limit, limit = _ref$limit === void 0 ? 10 : _ref$limit, savedXpub = _ref.xpub;
                _context.prev = 1;
                _context.t0 = savedXpub;

                if (_context.t0) {
                  _context.next = 7;
                  break;
                }

                _context.next = 6;
                return TrezorProxy.getPublicExtendedKey();

              case 6:
                _context.t0 = _context.sent;

              case 7:
                xpub = _context.t0;
                hdWallet = HDKey.fromExtendedKey(xpub);
                addresses = getChildrenAddress(hdWallet, offset, limit);
                return _context.abrupt("return", {
                  addresses: addresses,
                  xpub: xpub
                });

              case 13:
                _context.prev = 13;
                _context.t1 = _context["catch"](1);
                throw new NotificationError({
                  title: 'Access error',
                  text: "An error occurred while getting access to hardware device. Please, try again.",
                  type: 'is-danger'
                });

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 13]]);
      }));

      function getNextWallets(_x) {
        return _getNextWallets.apply(this, arguments);
      }

      return getNextWallets;
    }()
  }, {
    key: "getPublicExtendedKey",
    value: function () {
      var _getPublicExtendedKey = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        var path, _ref2, xpub;

        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                path = ENV.hdKeyMnemonic.path;
                _context2.next = 4;
                return TrezorConnect.getPublicKey({
                  path: path
                });

              case 4:
                _ref2 = _context2.sent;
                xpub = _ref2.payload.xpub;
                return _context2.abrupt("return", xpub);

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                throw new NotificationError({
                  title: 'Access error',
                  text: "An error occurred while getting access to hardware device. Please, try again.",
                  type: 'is-danger'
                });

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 9]]);
      }));

      function getPublicExtendedKey() {
        return _getPublicExtendedKey.apply(this, arguments);
      }

      return getPublicExtendedKey;
    }()
  }, {
    key: "sign",
    value: function () {
      var _sign = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(message, index) {
        var prefixedMessage, messageHash, _ref3, success, payload, signature, r, s, vInt, v;

        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // \u0019 \x19
                prefixedMessage = "\x19Ethereum Signed Message:\n".concat(message.length).concat(message);
                messageHash = sha3(prefixedMessage);
                _context3.next = 4;
                return TrezorConnect.ethereumSignMessage({
                  path: "".concat(HARDWARE_DERIVIATION_PATH).concat(index),
                  message: message
                });

              case 4:
                _ref3 = _context3.sent;
                success = _ref3.success;
                payload = _ref3.payload;

                if (success) {
                  _context3.next = 9;
                  break;
                }

                throw new Error(payload.error || 'Bad Trezor response');

              case 9:
                signature = payload.signature;
                r = "0x".concat(signature.slice(0, 64));
                s = "0x".concat(signature.slice(64, 128));
                vInt = toDecimal(signature.slice(128, 130));
                v = vInt === 27 || vInt === 28 ? toHex(vInt) : toHex(vInt + 27);
                return _context3.abrupt("return", {
                  message: message,
                  messageHash: messageHash,
                  signature: "0x".concat(signature),
                  r: r,
                  s: s,
                  v: v
                });

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function sign(_x2, _x3) {
        return _sign.apply(this, arguments);
      }

      return sign;
    }()
  }, {
    key: "signTransaction",
    value: function () {
      var _signTransaction = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4(transaction, index) {
        var _ref4, payload, sign, tx;

        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return TrezorConnect.ethereumSignTransaction({
                  path: "".concat(HARDWARE_DERIVIATION_PATH).concat(index),
                  transaction: transaction
                });

              case 2:
                _ref4 = _context4.sent;
                payload = _ref4.payload;

                if (!payload.error) {
                  _context4.next = 6;
                  break;
                }

                throw new Error(payload.error || 'Bad Trezor response');

              case 6:
                sign = {
                  r: payload.r,
                  s: payload.s,
                  v: payload.v
                };
                tx = new Tx(_objectSpread({}, transaction, sign));
                return _context4.abrupt("return", "0x".concat(tx.serialize().toString('hex')));

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function signTransaction(_x4, _x5) {
        return _signTransaction.apply(this, arguments);
      }

      return signTransaction;
    }()
  }]);

  return TrezorProxy;
}();

export default TrezorProxy;
//# sourceMappingURL=chunk-f6e67ce9.js.map
