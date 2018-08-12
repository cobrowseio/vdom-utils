'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fastDeepEqual = require('fast-deep-equal');

var _fastDeepEqual2 = _interopRequireDefault(_fastDeepEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PatchCompressor = function () {
    function PatchCompressor() {
        _classCallCheck(this, PatchCompressor);

        this.state = {};
    }

    _createClass(PatchCompressor, [{
        key: 'difference',
        value: function difference(object, base) {
            if (!base) return object;
            return Object.keys(object).map(function (key) {
                if ((0, _fastDeepEqual2.default)(object[key], base[key])) return false;
                return _defineProperty({}, key, object[key]);
            }).filter(function (v) {
                return v;
            }).reduce(function (a, b) {
                return _extends({}, a, b);
            }, {});
        }
    }, {
        key: 'compress',
        value: function compress(patch) {
            var _this = this;

            var nodes = {};
            patch.forEach(function (diff) {
                // generate the newest node state for each node altered by the patch
                nodes[diff.id] = _extends({}, nodes[diff.id], diff);
            });

            // then work out what's actually changed since the last state was persisted
            var compressed = Object.values(nodes).map(function (node) {
                var diff = _this.difference(node, _this.state[node.id]);
                if (Object.keys(diff).length === 0) return false;
                return _extends({ id: node.id }, diff);
            });

            return Object.values(compressed).filter(function (v) {
                return v;
            });
        }
    }, {
        key: 'persist',
        value: function persist(patch) {
            var _this2 = this;

            patch.forEach(function (diff) {
                _this2.state[diff.id] = _extends({}, _this2.state[diff.id], diff);
            });
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.state = {};
        }
    }]);

    return PatchCompressor;
}();

exports.default = PatchCompressor;
module.exports = exports['default'];