"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.filter");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    this.modified = {};
  }

  _createClass(PatchCompressor, [{
    key: "difference",
    value: function difference(object, base) {
      if (!base) return _objectSpread({}, object);
      var changes = Object.keys(object).map(function (key) {
        if ((0, _fastDeepEqual.default)(object[key], base[key])) return false;
        return _defineProperty({}, key, object[key]);
      }).filter(function (v) {
        return v;
      }); // reduce back into an object

      return changes.reduce(function (a, b) {
        return _objectSpread({}, a, b);
      }, {});
    }
  }, {
    key: "compress",
    value: function compress() {
      var _this = this;

      // then work out what's actually changed since the last state was persisted
      var compressed = Object.values(this.modified).map(function (modified) {
        var diff = _this.difference(modified, _this.state[modified.id]);

        if (Object.keys(diff).length === 0) return false;
        return _objectSpread({
          id: modified.id
        }, diff);
      }).filter(function (v) {
        return v;
      }); // run a sanity check to log any compression errors

      compressed.forEach(function (node) {
        (node.childNodes || []).forEach(function (id) {
          var inCompressed = _this.state[id] || _this.modified[id];
          if (!inCompressed) console.warn('child not in compressed state', id, node);
        });
      });
      return compressed;
    }
  }, {
    key: "mark",
    value: function mark() {
      this.state = _objectSpread({}, this.state, this.modified);
      this.modified = {};
      return this;
    }
  }, {
    key: "push",
    value: function push(patch) {
      var _this2 = this;

      patch.forEach(function (diff) {
        _this2.modified[diff.id] = _objectSpread({}, _this2.state[diff.id], _this2.modified[diff.id], diff);
      });
      return this;
    }
  }, {
    key: "remove",
    value: function remove() {
      var _this3 = this;

      var nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      nodes.forEach(function (id) {
        delete _this3.state[id];
        delete _this3.modified[id];
      });
      return this;
    }
  }, {
    key: "reset",
    value: function reset() {
      var newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this.state = {};
      this.modified = {};
      this.push(newState);
      return this;
    }
  }]);

  return PatchCompressor;
}();

exports.default = PatchCompressor;