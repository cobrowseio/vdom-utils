"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.reduce");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PatchCompressor =
/*#__PURE__*/
function () {
  function PatchCompressor() {
    _classCallCheck(this, PatchCompressor);

    this.state = {};
  }

  _createClass(PatchCompressor, [{
    key: "difference",
    value: function difference(object, base) {
      if (!base) return object;
      return Object.keys(object).map(function (key) {
        if ((0, _fastDeepEqual.default)(object[key], base[key])) return false;
        return _defineProperty({}, key, object[key]);
      }).filter(function (v) {
        return v;
      }).reduce(function (a, b) {
        return _objectSpread({}, a, b);
      }, {});
    }
  }, {
    key: "compress",
    value: function compress(patch) {
      var _this = this;

      var nodes = {};
      patch.forEach(function (diff) {
        // generate the newest node state for each node altered by the patch
        nodes[diff.id] = _objectSpread({}, nodes[diff.id], diff);
      }); // then work out what's actually changed since the last state was persisted

      var compressed = Object.values(nodes).map(function (node) {
        var diff = _this.difference(node, _this.state[node.id]);

        if (Object.keys(diff).length === 0) return false;
        return _objectSpread({
          id: node.id
        }, diff);
      });
      return Object.values(compressed).filter(function (v) {
        return v;
      });
    }
  }, {
    key: "persist",
    value: function persist(patch) {
      var _this2 = this;

      patch.forEach(function (diff) {
        _this2.state[diff.id] = _objectSpread({}, _this2.state[diff.id], diff);
      }); // run a sanity check to log any compression errors

      patch.forEach(function (diff) {
        _toConsumableArray(diff.childNodes).forEach(function (id) {
          var inCompressed = _this2.state[id];
          if (!inCompressed) console.warn('child not in compressed state', id, diff);
        });
      });
    }
  }, {
    key: "clearNodes",
    value: function clearNodes() {
      var _this3 = this;

      var nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      nodes.forEach(function (id) {
        _this3.state[id] = undefined;
      });
    }
  }, {
    key: "clear",
    value: function clear() {
      this.state = {};
    }
  }]);

  return PatchCompressor;
}();

exports.default = PatchCompressor;