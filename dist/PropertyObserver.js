"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.set");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PropertyObserver =
/*#__PURE__*/
function () {
  function PropertyObserver(onPropertySet) {
    _classCallCheck(this, PropertyObserver);

    this.onPropertySet = onPropertySet;
    this._klasses = new Set();
  }

  _createClass(PropertyObserver, [{
    key: "_trackObserver",
    value: function _trackObserver(Klass) {
      if (!Klass.__cbio_observers) Klass.__cbio_observers = new Set();

      Klass.__cbio_observers.add(this);
    }
  }, {
    key: "_untrackObserver",
    value: function _untrackObserver(Klass) {
      if (Klass.__cbio_observers) {
        Klass.__cbio_observers.delete(this);
      }
    }
  }, {
    key: "_tap",
    value: function _tap(Klass, property) {
      if (Klass["__cbio_override_".concat(property)]) return;
      Klass["__cbio_override_".concat(property)] = true;
      var descriptor = Object.getOwnPropertyDescriptor(Klass.prototype, property);
      var originalSet = descriptor.set;

      descriptor.set = function (val) {
        var _this = this;

        originalSet.call(this, val);

        if (Klass.__cbio_observers) {
          Klass.__cbio_observers.forEach(function (observer) {
            observer.onPropertySet(_this, property, val);
          });
        }
      };

      Object.defineProperty(Klass.prototype, property, descriptor);
    }
  }, {
    key: "observe",
    value: function observe(Klass, property) {
      this._klasses.add(Klass);

      this._trackObserver(Klass);

      this._tap(Klass, property);
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      var _this2 = this;

      this._klasses.forEach(function (Klass) {
        return _this2._untrackObserver(Klass);
      });

      this._klasses.clear();
    }
  }]);

  return PropertyObserver;
}();

exports.default = PropertyObserver;