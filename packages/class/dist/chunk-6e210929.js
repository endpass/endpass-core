import { a as _createClass, b as _asyncToGenerator, c as _regeneratorRuntime, d as _classCallCheck } from './chunk-350af72f.js';
import HDKey from 'ethereumjs-wallet/hdkey';
import { a as NotificationError } from './chunk-25f6a05b.js';
import { a as getChildrenAddress } from './chunk-ade9ee03.js';

var HDProxy =
/*#__PURE__*/
function () {
  function HDProxy() {
    _classCallCheck(this, HDProxy);
  }

  _createClass(HDProxy, null, [{
    key: "getNextWallets",
    value: function () {
      var _getNextWallets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(_ref) {
        var _ref$offset, offset, _ref$limit, limit, xpub, hdWallet, addresses;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref$offset = _ref.offset, offset = _ref$offset === void 0 ? 0 : _ref$offset, _ref$limit = _ref.limit, limit = _ref$limit === void 0 ? 10 : _ref$limit, xpub = _ref.xpub;
                _context.prev = 1;
                hdWallet = HDKey.fromExtendedKey(xpub);
                addresses = getChildrenAddress(hdWallet, offset, limit);
                return _context.abrupt("return", {
                  addresses: addresses,
                  xpub: xpub
                });

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                throw new NotificationError({
                  title: 'Access error',
                  text: "An error occurred while getting access to HD. Please, try again.",
                  type: 'is-danger'
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 7]]);
      }));

      function getNextWallets(_x) {
        return _getNextWallets.apply(this, arguments);
      }

      return getNextWallets;
    }()
  }]);

  return HDProxy;
}();

export default HDProxy;
//# sourceMappingURL=chunk-6e210929.js.map
