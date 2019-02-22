import { b as _asyncToGenerator, c as _regeneratorRuntime, a as _createClass, d as _classCallCheck } from './chunk-350af72f.js';
import { a as _objectSpread } from './chunk-96639b88.js';
import { c as _slicedToArray } from './chunk-9a880e46.js';
import regPath from 'path-to-regexp';
import Dexie from 'dexie';

var utils = {
  getRouteKey: function getRouteKey(routesRegexp, routePath) {
    return Object.keys(routesRegexp).find(function (key) {
      var re = routesRegexp[key];
      return re.test(routePath);
    });
  },
  getPath: function getPath(serverUrl, url) {
    var levels = url.split(serverUrl);
    var keysPath = levels.pop() || '';
    var ret = keysPath[0] === '/' ? keysPath.substring(1) : keysPath;
    return ret;
  },
  getPathArgs: function getPathArgs(routesRegexp, key, routePath) {
    var keys = regPath.parse(key);
    var re = routesRegexp[key];
    re.lastIndex = 0; // drop exec position

    var values = re.exec(routePath);
    return keys.reduce(function (map, item, index) {
      if (item && item.name) {
        map[item.name] = values[index];
      }

      return map;
    }, {});
  }
};

var itemsRequest = {
  getItemData: function getItemData(list) {
    return list.map(function (node) {
      return node.data;
    });
  },
  itemsRead: function itemsRead(table) {
    return table.toArray(function (list) {
      return itemsRequest.getItemData(list);
    });
  },
  itemRead: function itemRead(table, whereExp) {
    return new Promise(function (resolve, reject) {
      table.where(whereExp).first(function (node) {
        return node && node.data ? resolve(node.data) : reject('Data is empty');
      }).catch(reject);
    });
  },
  itemRemove: function itemRemove(table, whereExp) {
    return table.where(whereExp).delete();
  },
  itemWrite: function itemWrite(table, id, payload) {
    // scheme default for all tables
    return table.put({
      id: id,
      data: payload
    });
  },
  itemAdd: function () {
    var _itemAdd = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee(table, id, payload) {
      var stored, res, pushData;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              stored = {};
              _context.prev = 1;
              _context.next = 4;
              return itemsRequest.itemRead(table, {
                id: id
              });

            case 4:
              res = _context.sent;
              Object.assign(stored, res || {});
              _context.next = 10;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);

            case 10:
              pushData = {
                id: id,
                data: _objectSpread({}, stored, payload)
              };
              return _context.abrupt("return", table.put(pushData));

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 8]]);
    }));

    function itemAdd(_x, _x2, _x3) {
      return _itemAdd.apply(this, arguments);
    }

    return itemAdd;
  }()
};

function getId(route, args) {
  var id = route.id;
  var res = typeof id === 'function' ? id(args) : args[id];
  return res;
}

var routeMethods = {
  read: function read(route, args) {
    if (!route.id) {
      return itemsRequest.itemsRead(route.table);
    }

    var id = getId(route, args);
    return itemsRequest.itemRead(route.table, {
      id: id
    });
  },
  add: function add(route, args, params) {
    var id = getId(route, args);
    return itemsRequest.itemAdd(route.table, id, params.payload);
  },
  write: function write(route, args, params) {
    var id = getId(route, args);
    return itemsRequest.itemWrite(route.table, id, params.payload);
  },
  remove: function remove(route, args, params) {
    var id = getId(route, args);
    return itemsRequest.itemRemove(route.table, {
      id: id
    }, params.payload);
  }
};

var db = new Dexie('LocalProvider');
db.version(1.1).stores({
  accounts: 'id,data',
  accountsInfo: 'id,data',
  settings: 'id,data',
  tokens: 'id,data',
  networks: 'id,data'
});

function getNetworkId(id) {
  return id.split('/')[0];
}

var routes = {
  'account/:addressId/info': {
    table: db.accountsInfo,
    id: 'addressId'
  },
  'account/:addressId': {
    table: db.accounts,
    id: 'addressId'
  },
  'networks/:networkPath(.*)': {
    table: db.networks,
    id: 'networkPath'
  },
  'tokens/:networkId': {
    // only read
    table: db.tokens,
    read: function read(route, args) {
      return route.table.filter(function (item) {
        return getNetworkId(item.id) === args.networkId;
      }).toArray(function (list) {
        return itemsRequest.getItemData(list);
      });
    }
  },
  'tokens/:networkId/:addressId': {
    table: db.tokens,
    id: function id(args) {
      return "".concat(args.networkId, "/").concat(args.addressId);
    }
  },
  accounts: {
    table: db.accounts,
    read: function () {
      var _read = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(route) {
        var list, ret;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return itemsRequest.itemsRead(route.table);

              case 2:
                list = _context.sent;
                ret = list.map(function (item) {
                  return item.address;
                });
                return _context.abrupt("return", ret);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function read(_x) {
        return _read.apply(this, arguments);
      }

      return read;
    }()
  },
  settings: {
    table: db.settings,
    id: function id() {
      return 'userSettings';
    },
    init: function () {
      var _init = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(route) {
        var initialData, data, payload;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                initialData = {
                  email: '',
                  otp_enabled: false
                };
                _context2.prev = 1;
                _context2.next = 4;
                return routeMethods.read(route);

              case 4:
                data = _context2.sent;
                _context2.next = 10;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](1);
                data = {};

              case 10:
                payload = _objectSpread({}, initialData, data);

                if (!payload.email) {
                  payload.email = initialData.email;
                }

                return _context2.abrupt("return", routeMethods.add(route, {}, {
                  payload: payload
                }));

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 7]]);
      }));

      function init(_x2) {
        return _init.apply(this, arguments);
      }

      return init;
    }(),
    read: function () {
      var _read2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(route, args) {
        var _ref, _ref2, tokens, networks, settings;

        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return Promise.all([db.tokens.toArray(function (list) {
                  return (// create list of tokens in network id map. { netId:[token1, token2, ], }
                    list.reduce(function (map, item) {
                      var netId = getNetworkId(item.id);
                      /* eslint-disable-next-line */

                      var tokenList = map[netId] = map[netId] || [];
                      tokenList.push(item.data);
                      return map;
                    }, {})
                  );
                }), db.networks.toArray(function (list) {
                  return itemsRequest.getItemData(list);
                }), routeMethods.read(route, args)]);

              case 2:
                _ref = _context3.sent;
                _ref2 = _slicedToArray(_ref, 3);
                tokens = _ref2[0];
                networks = _ref2[1];
                settings = _ref2[2];
                return _context3.abrupt("return", _objectSpread({
                  tokens: tokens,
                  networks: networks
                }, settings));

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function read(_x3, _x4) {
        return _read2.apply(this, arguments);
      }

      return read;
    }()
  },
  'settings/otp': {
    table: db.settings,
    id: function id() {
      return 'otp';
    }
  }
};

var routesRegexp = Object.keys(routes).reduce(function (res, key) {
  res[key] = regPath(key);
  return res;
}, {});

var Database =
/*#__PURE__*/
function () {
  function Database(url) {
    _classCallCheck(this, Database);

    this.serverUrl = url;
  }

  _createClass(Database, [{
    key: "initRoutes",
    value: function () {
      var _initRoutes = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var list;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                list = Object.keys(routes).filter(function (key) {
                  return !!routes[key].init;
                });
                _context.next = 3;
                return Promise.all(list.map(function (key) {
                  var route = routes[key];
                  return route.init(route);
                }));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initRoutes() {
        return _initRoutes.apply(this, arguments);
      }

      return initRoutes;
    }()
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(params) {
        var url, method, path, routeKey, route, args, routeMethod;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                url = params.url, method = params.method;

                if (!(method === 'clear')) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", this.clear());

              case 3:
                path = utils.getPath(this.serverUrl, url);
                routeKey = utils.getRouteKey(routesRegexp, path);

                if (routeKey) {
                  _context2.next = 7;
                  break;
                }

                throw new Error("not defined route key in ".concat(path));

              case 7:
                route = routes[routeKey];
                args = utils.getPathArgs(routesRegexp, routeKey, path);
                routeMethod = route[method] || routeMethods[method];
                return _context2.abrupt("return", routeMethod(route, args, params));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function request(_x) {
        return _request.apply(this, arguments);
      }

      return request;
    }()
  }, {
    key: "clear",
    value: function clear() {
      var map = {};
      var list = Object.keys(routes).filter(function (key) {
        var table = routes[key].table;
        var filtered = !map[table.name];
        map[table.name] = true;
        return filtered;
      });
      var tables = list.map(function (key) {
        return routes[key].table;
      });
      return Promise.all(tables.map(function (table) {
        return table.clear();
      }));
    }
  }]);

  return Database;
}();

export default Database;
