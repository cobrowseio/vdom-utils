"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PatchCompressor = function () {
    function PatchCompressor() {
        _classCallCheck(this, PatchCompressor);
    }

    _createClass(PatchCompressor, null, [{
        key: "_merge",
        value: function _merge() {
            var older = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var newer = arguments[1];

            return _extends({}, older, newer);
        }
    }, {
        key: "compress",
        value: function compress(diff) {
            var _this = this;

            var nodes = {};
            diff.forEach(function (node) {
                nodes[node.id] = _this._merge(nodes[node.id], node);
            });
            return Object.values(nodes).filter(function (v) {
                return v;
            });
        }
    }]);

    return PatchCompressor;
}();

exports.default = PatchCompressor;
module.exports = exports["default"];