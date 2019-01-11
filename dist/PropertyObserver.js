"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PropertyObserver =
/*#__PURE__*/
function () {
  function PropertyObserver(onPropertySet) {
    _classCallCheck(this, PropertyObserver);

    this.onPropertySet = onPropertySet;
    this._overridden = [];
  }

  _createClass(PropertyObserver, [{
    key: "observe",
    value: function observe(Klass, property) {
      var self = this;
      if (Klass["__cbio_override_".concat(property)]) return;
      Klass["__cbio_override_".concat(property)] = true;

      this._overridden.push(Klass);

      var descriptor = Object.getOwnPropertyDescriptor(Klass.prototype, property);
      var originalSet = descriptor.set;

      descriptor.set = function (val) {
        originalSet.call(this, val);
        self.onPropertySet(this, property, val);
      };

      Object.defineProperty(Klass.prototype, property, descriptor);
    }
  }, {
    key: "disconnect",
    value: function disconnect() {// todo: disconnect logic
    }
  }]);

  return PropertyObserver;
}();

exports.default = PropertyObserver;