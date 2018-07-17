"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PropertyObserver = function () {
    function PropertyObserver(onPropertySet) {
        _classCallCheck(this, PropertyObserver);

        this.onPropertySet = onPropertySet;
        this._overridden = [];
    }

    _createClass(PropertyObserver, [{
        key: "observe",
        value: function observe(Klass, property) {
            var self = this;
            if (Klass["__cbio_override_" + property]) return;
            Klass["__cbio_override_" + property] = true;
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
        value: function disconnect() {
            // todo: disconnect logic
        }
    }]);

    return PropertyObserver;
}();

exports.default = PropertyObserver;
module.exports = exports["default"];