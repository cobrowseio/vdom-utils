"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.function.bind");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MutatingEventObserver =
/*#__PURE__*/
function () {
  function MutatingEventObserver(onEvent) {
    _classCallCheck(this, MutatingEventObserver);

    this.onEvent = onEvent;
    this.onValueChangedEvent = this.onValueChangedEvent.bind(this);
    this._observing = [];
    this._windows = [];
  }

  _createClass(MutatingEventObserver, [{
    key: "observe",
    value: function observe(root) {
      root.addEventListener('scroll', this.onEvent, {
        capture: true,
        passive: true
      });
      root.addEventListener('change', this.onValueChangedEvent, {
        capture: true,
        passive: true
      });
      root.addEventListener('keydown', this.onValueChangedEvent, {
        capture: true,
        passive: true
      });
      root.addEventListener('keyup', this.onValueChangedEvent, {
        capture: true,
        passive: true
      });
      root.addEventListener('keypress', this.onValueChangedEvent, {
        capture: true,
        passive: true
      });

      this._observing.push(root);

      var document = root.ownerDocument || root;
      var window = document.defaultView;

      if (window) {
        window.addEventListener('hashchange', this.onEvent, {
          capture: true,
          passive: true
        });
        window.addEventListener('resize', this.onEvent, {
          capture: true,
          passive: true
        });

        this._windows.push(window);
      }
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      var _this = this;

      this._observing.forEach(function (root) {
        root.removeEventListener('scroll', _this.onEvent, {
          capture: true,
          passive: true
        });
        root.removeEventListener('change', _this.onValueChangedEvent, {
          capture: true,
          passive: true
        });
        root.removeEventListener('keydown', _this.onValueChangedEvent, {
          capture: true,
          passive: true
        });
        root.removeEventListener('keyup', _this.onValueChangedEvent, {
          capture: true,
          passive: true
        });
        root.removeEventListener('keypress', _this.onValueChangedEvent, {
          capture: true,
          passive: true
        });
      });

      this._observing = [];

      this._windows.forEach(function (window) {
        window.removeEventListener('hashchange', _this.onEvent, {
          capture: true,
          passive: true
        });
        window.removeEventListener('resize', _this.onEvent, {
          capture: true,
          passive: true
        });
      });

      this._windows = [];
    }
  }, {
    key: "onValueChangedEvent",
    value: function onValueChangedEvent(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        this.onEvent(e);
      }
    }
  }]);

  return MutatingEventObserver;
}();

exports.default = MutatingEventObserver;