'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MutatingEventObserver = function () {
    function MutatingEventObserver(onEvent) {
        _classCallCheck(this, MutatingEventObserver);

        this.onEvent = onEvent;

        this.onValueChangedEvent = this.onValueChangedEvent.bind(this);

        this._observing = [];
    }

    _createClass(MutatingEventObserver, [{
        key: 'observe',
        value: function observe(root) {
            root.addEventListener('scroll', this.onEvent, { capture: true, passive: true });
            root.addEventListener('change', this.onValueChangedEvent, { capture: true, passive: true });
            root.addEventListener('keydown', this.onValueChangedEvent, { capture: true, passive: true });
            root.addEventListener('keyup', this.onValueChangedEvent, { capture: true, passive: true });
            root.addEventListener('keypress', this.onValueChangedEvent, { capture: true, passive: true });

            var document = root.ownerDocument || root;
            var window = document.defaultView;
            window.addEventListener('hashchange', this.onEvent, { capture: true, passive: true });
            window.addEventListener('resize', this.onEvent, { capture: true, passive: true });

            this._observing.push(root);
        }
    }, {
        key: 'disconnect',
        value: function disconnect() {
            var _this = this;

            this._observing.forEach(function (root) {
                root.removeEventListener('scroll', _this.onEvent, { capture: true, passive: true });
                root.removeEventListener('change', _this.onValueChangedEvent, { capture: true, passive: true });
                root.removeEventListener('keydown', _this.onValueChangedEvent, { capture: true, passive: true });
                root.removeEventListener('keyup', _this.onValueChangedEvent, { capture: true, passive: true });
                root.removeEventListener('keypress', _this.onValueChangedEvent, { capture: true, passive: true });

                var document = root.ownerDocument || root;
                var window = document.defaultView;
                window.removeEventListener('hashchange', _this.onEvent, { capture: true, passive: true });
                window.removeEventListener('resize', _this.onEvent, { capture: true, passive: true });
            });

            this._observing = [];
        }
    }, {
        key: 'onValueChangedEvent',
        value: function onValueChangedEvent(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                this.onEvent(e);
            }
        }
    }]);

    return MutatingEventObserver;
}();

exports.default = MutatingEventObserver;
module.exports = exports['default'];