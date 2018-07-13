'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DiffBatcher = function (_EventEmitter) {
    _inherits(DiffBatcher, _EventEmitter);

    function DiffBatcher() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { throttle: 300 };

        _classCallCheck(this, DiffBatcher);

        var _this = _possibleConstructorReturn(this, (DiffBatcher.__proto__ || Object.getPrototypeOf(DiffBatcher)).call(this));

        _this.options = options;
        _this._batch = [];
        _this._emitTimeout = false;
        return _this;
    }

    _createClass(DiffBatcher, [{
        key: 'cleanup',
        value: function cleanup() {
            this.removeAllListeners();
            clearTimeout(this._emitTimeout);
        }
    }, {
        key: 'push',
        value: function push(diff) {
            var _this2 = this;

            if (!Array.isArray(diff)) diff = [diff];
            this._batch = [].concat(_toConsumableArray(this._batch), _toConsumableArray(diff));
            if (!this._emitTimeout) {
                this._emitState();
                this._emitTimeout = setTimeout(function () {
                    _this2._emitTimeout = false;
                    _this2._emitState();
                }, this.options.throttle);
            }
        }
    }, {
        key: '_emitState',
        value: function _emitState() {
            if (this._batch.length) {
                this.emit('patch', this.peek());
            }
        }
    }, {
        key: 'peek',
        value: function peek() {
            return [].concat(_toConsumableArray(this._batch));
        }
    }, {
        key: 'clear',
        value: function clear() {
            this._batch = [];
            return this;
        }
    }]);

    return DiffBatcher;
}(_events.EventEmitter);

exports.default = DiffBatcher;
module.exports = exports['default'];