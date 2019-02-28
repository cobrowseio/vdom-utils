"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = depthFirstPreOrder;
exports.depthFirstPostOrder = depthFirstPostOrder;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.array.map");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function depthFirstPreOrder(node, visitor) {
  var children = node.childNodes;
  var mapped = visitor(node, function () {
    var replacementChildren = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    children = replacementChildren;
  });
  if (!children || !children.length) return mapped;
  return _objectSpread({}, mapped, {
    childNodes: Array.from(children).map(function (child) {
      return depthFirstPreOrder(child, visitor);
    })
  });
}

function depthFirstPostOrder(node, visitor) {
  var children = Array.from(node.childNodes || []);
  var childResults = children.map(function (child) {
    return depthFirstPostOrder(child, visitor);
  });
  return visitor(node, childResults);
}