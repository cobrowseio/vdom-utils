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

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.is-array");

var _events = require("events");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DiffBatcher =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(DiffBatcher, _EventEmitter);

  function DiffBatcher() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      throttle: 300
    };

    _classCallCheck(this, DiffBatcher);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DiffBatcher).call(this));
    _this.options = options;
    _this._batch = [];
    _this._emitTimeout = false;
    return _this;
  }

  _createClass(DiffBatcher, [{
    key: "cleanup",
    value: function cleanup() {
      this.removeAllListeners();
      clearTimeout(this._emitTimeout);
      clearTimeout(this._shortEmitTimeout);
    }
  }, {
    key: "push",
    value: function push(diff) {
      var _this2 = this;

      if (!Array.isArray(diff)) diff = [diff];
      this._batch = [].concat(_toConsumableArray(this._batch), _toConsumableArray(diff));

      if (!this._emitTimeout) {
        // schedule next emit for a little while later
        this._emitTimeout = setTimeout(function () {
          _this2._emitTimeout = false;

          _this2._emitState();
        }, this.options.throttle); // also emit fairly immediately to keep things
        // feeling responsive

        if (!this._shortEmitTimeout) {
          this._shortEmitTimeout = setTimeout(function () {
            _this2._shortEmitTimeout = false;

            _this2._emitState();
          }, 10);
        }
      }
    }
  }, {
    key: "_emitState",
    value: function _emitState() {
      if (this._batch.length) {
        this.emit('patch', this.peek());
      }
    }
  }, {
    key: "peek",
    value: function peek() {
      return _toConsumableArray(this._batch);
    }
  }, {
    key: "clear",
    value: function clear() {
      this._batch = [];
      return this;
    }
  }]);

  return DiffBatcher;
}(_events.EventEmitter);

exports.default = DiffBatcher;