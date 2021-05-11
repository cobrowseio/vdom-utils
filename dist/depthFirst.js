"use strict";

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.array.for-each.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.object.define-properties.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = depthFirstPreOrder;
exports.depthFirstPostOrder = depthFirstPostOrder;

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.object.define-property.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function depthFirstPreOrder(node, visitor) {
  var children = node.childNodes;
  var mapped = visitor(node, function () {
    var replacementChildren = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    children = replacementChildren;
  });
  if (!children || !children.length) return mapped;
  return _objectSpread(_objectSpread({}, mapped), {}, {
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