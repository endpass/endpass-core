import { a as _createClass, b as _asyncToGenerator, c as _regeneratorRuntime, d as _classCallCheck } from './chunk-350af72f.js';
import { a as _objectSpread } from './chunk-96639b88.js';
import Tx from 'ethereumjs-tx';
import HDKey from 'ethereumjs-wallet/hdkey';
import { sha3, toHex } from 'web3-utils';
import { f as HARDWARE_DERIVIATION_PATH } from './chunk-b6fd9bce.js';
import { a as NotificationError } from './chunk-25f6a05b.js';
import { a as getChildrenAddress } from './chunk-ade9ee03.js';
import LedgerTransport from '@ledgerhq/hw-transport-u2f';
import Eth from '@ledgerhq/hw-app-eth';

var LedgerProxy =
/*#__PURE__*/
function () {
  function LedgerProxy() {
    _classCallCheck(this, LedgerProxy);
  }

  _createClass(LedgerProxy, null, [{
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
                return LedgerProxy.getPublicExtendedKey();

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

                if (!(_context.t1 instanceof NotificationError)) {
                  _context.next = 17;
                  break;
                }

                throw _context.t1;

              case 17:
                throw new NotificationError({
                  title: 'Access error',
                  text: "An error occurred while getting access to hardware device. Please, try again.",
                  type: 'is-danger'
                });

              case 18:
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
        var transport, eth, _ref2, publicKey, text;

        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return LedgerTransport.create();

              case 3:
                transport = _context2.sent;
                eth = new Eth(transport);
                _context2.next = 7;
                return eth.getAddress(ENV.hdKeyMnemonic.path);

              case 7:
                _ref2 = _context2.sent;
                publicKey = _ref2.publicKey;
                return _context2.abrupt("return", publicKey);

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);
                text = 'An error occurred while getting access to hardware device. Please, try again.';

                if (_context2.t0.message.includes('U2F')) {
                  text = _context2.t0.message;
                }

                throw new NotificationError({
                  title: 'Access error',
                  text: text,
                  type: 'is-danger'
                });

              case 18:
                _context2.prev = 18;

                if (!(transport && transport.close)) {
                  _context2.next = 22;
                  break;
                }

                _context2.next = 22;
                return transport.close().catch(console.log);

              case 22:
                return _context2.finish(18);

              case 23:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 12, 18, 23]]);
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
        var transport, eth, prefixedMessage, messageHash, _ref3, r, s, vInt, vRaw, v, signature;

        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return LedgerTransport.create();

              case 3:
                transport = _context3.sent;
                eth = new Eth(transport);
                prefixedMessage = "\x19Ethereum Signed Message:\n".concat(message.length).concat(message);
                messageHash = sha3(prefixedMessage);
                _context3.next = 9;
                return eth.signPersonalMessage("".concat(HARDWARE_DERIVIATION_PATH).concat(index), Buffer.from(message).toString('hex'));

              case 9:
                _ref3 = _context3.sent;
                r = _ref3.r;
                s = _ref3.s;
                vInt = _ref3.v;
                vRaw = (vInt - 27).toString(16);

                if (vRaw.length < 2) {
                  vRaw = "0".concat(vRaw);
                }

                v = vRaw === 27 || vRaw === 28 ? toHex(vInt) : toHex(vInt + 27);
                signature = "0x".concat(r).concat(s).concat(vRaw);
                return _context3.abrupt("return", {
                  message: message,
                  messageHash: messageHash,
                  signature: signature,
                  r: "0x".concat(r),
                  s: "0x".concat(s),
                  v: "0x".concat(v)
                });

              case 20:
                _context3.prev = 20;
                _context3.t0 = _context3["catch"](0);
                console.log(_context3.t0);
                throw new NotificationError({
                  title: 'Access error',
                  text: "An error occurred while getting access to hardware device. Please, try again.",
                  type: 'is-danger'
                });

              case 24:
                _context3.prev = 24;

                if (!(transport && transport.close)) {
                  _context3.next = 28;
                  break;
                }

                _context3.next = 28;
                return transport.close().catch(console.log);

              case 28:
                return _context3.finish(24);

              case 29:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 20, 24, 29]]);
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
        var transport, eth, tempTx, payload, sign, tx;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return LedgerTransport.create();

              case 3:
                transport = _context4.sent;
                eth = new Eth(transport);
                tempTx = new Tx(transaction);
                _context4.next = 8;
                return eth.signTransaction("".concat(HARDWARE_DERIVIATION_PATH).concat(index), "".concat(tempTx.serialize().toString('hex')));

              case 8:
                payload = _context4.sent;

                if (payload) {
                  _context4.next = 11;
                  break;
                }

                throw new Error('Bad Trezor response');

              case 11:
                sign = {
                  r: payload.r,
                  s: payload.s,
                  v: payload.v
                };
                tx = new Tx(_objectSpread({}, transaction, sign));
                return _context4.abrupt("return", "0x".concat(tx.serialize().toString('hex')));

              case 16:
                _context4.prev = 16;
                _context4.t0 = _context4["catch"](0);
                console.log(_context4.t0);
                throw new NotificationError({
                  title: 'Access error',
                  text: "An error occurred while getting access to hardware device. Please, try again.",
                  type: 'is-danger'
                });

              case 20:
                _context4.prev = 20;

                if (!(transport && transport.close)) {
                  _context4.next = 24;
                  break;
                }

                _context4.next = 24;
                return transport.close().catch(console.log);

              case 24:
                return _context4.finish(20);

              case 25:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 16, 20, 25]]);
      }));

      function signTransaction(_x4, _x5) {
        return _signTransaction.apply(this, arguments);
      }

      return signTransaction;
    }()
  }]);

  return LedgerProxy;
}();

export default LedgerProxy;
