"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es.object.define-property.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CompressionError = /*#__PURE__*/function () {
  function CompressionError(message, node) {
    _classCallCheck(this, CompressionError);

    this._message = message;
    this._node = node;
  }

  _createClass(CompressionError, [{
    key: "message",
    get: function get() {
      return this._message;
    }
  }, {
    key: "node",
    get: function get() {
      return this._node;
    }
  }]);

  return CompressionError;
}();

exports["default"] = CompressionError;