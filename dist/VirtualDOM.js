"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

var _depthFirst = _interopRequireWildcard(require("./depthFirst"));

var _CompressionError = _interopRequireDefault(require("./CompressionError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var VirtualDOM =
/*#__PURE__*/
function () {
  function VirtualDOM(id) {
    _classCallCheck(this, VirtualDOM);

    this._id = id;
    this._dom = {
      id: id,
      childNodes: []
    };
  }

  _createClass(VirtualDOM, [{
    key: "applyPatch",
    value: function applyPatch(patch) {
      this._dom = VirtualDOM.applyPatch(this._dom, patch);
      return this;
    }
  }, {
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "document",
    get: function get() {
      return this._dom;
    }
  }], [{
    key: "applyPatch",
    value: function applyPatch(document, patch) {
      // first build an index of the nodes id we need to
      // update so we can quickly look them up.
      var nodeIdMap = {};
      (0, _depthFirst.default)(document, function (n) {
        if (!n.id) console.warn('node missing id', n);else nodeIdMap[n.id] = n;
      }); // then apply the diffs to the existing nodes,
      // and also create new node records for discovered
      // nodes if we need to.

      var modifiedNodesMap = {};
      patch.forEach(function (diff) {
        if (!diff.id) console.warn('diff missing id', diff);else {
          var existing = nodeIdMap[diff.id] || {};
          nodeIdMap[diff.id] = _objectSpread({}, existing, diff);
          modifiedNodesMap[diff.id] = true;
        }
      }); // then make sure all the node id's in the childNodes
      // arrays have been expanded into their denormalized form
      // and the childNodes arrays are using the modified nodes

      Object.keys(modifiedNodesMap).forEach(function (nid) {
        var n = nodeIdMap[nid];
        n.childNodes = (n.childNodes || []).map(function (child) {
          var id = child.id || child;

          if (!nodeIdMap[id]) {
            throw new _CompressionError.default("denormalisation failed for child ".concat(id), n);
          }

          return nodeIdMap[id];
        });
      }); // for all modified nodes we want to make sure
      // all parent nodes also appear changed on equalty
      // comparison

      var root = nodeIdMap[document.id];
      (0, _depthFirst.depthFirstPostOrder)(root, function (n, children) {
        var modified = children.map(function (c) {
          return modifiedNodesMap[c.id];
        });
        var childWasModified = modified.reduce(function (a, b) {
          return a || b;
        }, false);

        if (childWasModified) {
          // if a child was modified, we count as modified too, so make sure
          // the ndoe is marked in the modification table
          modifiedNodesMap[n.id] = true; // if the node was modified or a child of the node was modified
          // then we need to ensure the current node will fail equality checks

          nodeIdMap[n.id] = _objectSpread({}, n, {
            childNodes: children
          });
        }

        return nodeIdMap[n.id];
      });
      return nodeIdMap[document.id];
    }
  }]);

  return VirtualDOM;
}();

exports.default = VirtualDOM;