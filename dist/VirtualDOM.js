'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _depthFirst = require('./depthFirst');

var _depthFirst2 = _interopRequireDefault(_depthFirst);

var _CompressionError = require('./CompressionError');

var _CompressionError2 = _interopRequireDefault(_CompressionError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VirtualDOM = function () {
    function VirtualDOM(id) {
        _classCallCheck(this, VirtualDOM);

        this._id = id;
        this._dom = { id: id, childNodes: [] };
    }

    _createClass(VirtualDOM, [{
        key: 'applyPatch',
        value: function applyPatch(patch) {
            this._dom = VirtualDOM.applyPatch(this._dom, patch);
            return this;
        }
    }, {
        key: 'id',
        get: function get() {
            return this._id;
        }
    }, {
        key: 'document',
        get: function get() {
            return this._dom;
        }
    }], [{
        key: 'applyPatch',
        value: function applyPatch(document, patch) {
            // first build an index of the nodes currently
            // in the tree so we can quickly look them up.
            var nodeIdMap = {};
            (0, _depthFirst2.default)(document, function (n) {
                if (!n.id) console.warning('node missing id', n);else nodeIdMap[n.id] = _extends({}, n);
            });

            // then apply the diffs to the existing nodes,
            // and also create new node records for discovered
            // nodes if we need to.
            patch.forEach(function (diff) {
                if (!diff.id) console.warning('diff missing id', diff);else {
                    var existing = nodeIdMap[diff.id] || {};
                    nodeIdMap[diff.id] = _extends({}, existing, diff);
                }
            });

            // then make sure all the node id's in the childNodes
            // array have been expanded into their denormalized form
            Object.values(nodeIdMap).forEach(function (n) {
                n.childNodes = (n.childNodes || []).map(function (child) {
                    var id = child.id || child;
                    if (!nodeIdMap[id]) {
                        throw new _CompressionError2.default('denormalisation failed for ' + id);
                    }
                    return nodeIdMap[id];
                });
            });

            return nodeIdMap[document.id];
        }
    }]);

    return VirtualDOM;
}();

exports.default = VirtualDOM;
module.exports = exports['default'];