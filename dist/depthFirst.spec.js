"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.array.for-each.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.object.define-properties.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.join.js");

var _depthFirst = _interopRequireWildcard(require("./depthFirst"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('depthFirst', function () {
  var tree = {
    id: 1,
    childNodes: [{
      id: 2,
      childNodes: [{
        id: 3
      }, {
        id: 4,
        childNodes: []
      }]
    }, {
      id: 5,
      childNodes: []
    }]
  };
  it('should traverse a tree', function () {
    var progress = 0;
    (0, _depthFirst["default"])(tree, function (node) {
      if (progress >= node.id) throw new Error("wrong order ".concat(node.id));
      progress = node.id;
    });
  });
  it('should allow skipping subtrees', function () {
    var nodes = 0;
    (0, _depthFirst["default"])(tree, function (node, skip) {
      nodes += 1;
      skip();
    });
    if (nodes >= 2) throw new Error('wrong number of nodes');
  });
  it('should allow pre order traversal', function () {
    var order = [];
    (0, _depthFirst["default"])(tree, function (node) {
      order.push(node.id);
    });
    if (order.join(' ') !== [1, 2, 3, 4, 5].join(' ')) throw new Error('arrays not equal');
  });
  it('should allow pre order mapping', function () {
    var mapped = (0, _depthFirst["default"])(tree, function (node) {
      return _objectSpread(_objectSpread({}, node), {}, {
        mapped: true
      });
    });
    (0, _depthFirst["default"])(mapped, function (node) {
      if (!node.mapped) throw new Error('expecting all nodes to have been mapped');
    });
  });
  it('should allow post order traversal', function () {
    var order = [];
    (0, _depthFirst.depthFirstPostOrder)(tree, function (node) {
      order.push(node.id);
    });
    if (order.join(' ') !== [3, 4, 2, 5, 1].join(' ')) throw new Error('arrays not equal');
  });
  it('should allow post order mapping', function () {
    var mapped = (0, _depthFirst.depthFirstPostOrder)(tree, function (node, childResults) {
      return _objectSpread(_objectSpread({}, node), {}, {
        childNodes: childResults,
        mapped: true
      });
    });
    (0, _depthFirst.depthFirstPostOrder)(mapped, function (node) {
      if (!node.mapped) throw new Error('expecting all nodes to have been mapped');
    });
  });
});