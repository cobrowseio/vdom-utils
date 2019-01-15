"use strict";

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

var _depthFirst = _interopRequireWildcard(require("./depthFirst"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
    (0, _depthFirst.default)(tree, function (node) {
      if (progress >= node.id) throw new Error("wrong order ".concat(node.id));
      progress = node.id;
    });
  });
  it('should allow skipping subtrees', function () {
    var nodes = 0;
    (0, _depthFirst.default)(tree, function (node, skip) {
      nodes += 1;
      skip();
    });
    if (nodes >= 2) throw new Error('wrong number of nodes');
  });
  it('should allow pre order traversal', function () {
    var order = [];
    (0, _depthFirst.default)(tree, function (node) {
      order.push(node.id);
    });
    if (order.join(' ') !== [1, 2, 3, 4, 5].join(' ')) throw new Error('arrays not equal');
  });
  it('should allow pre order mapping', function () {
    var mapped = (0, _depthFirst.default)(tree, function (node) {
      return _objectSpread({}, node, {
        mapped: true
      });
    });
    (0, _depthFirst.default)(mapped, function (node) {
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
      return _objectSpread({}, node, {
        childNodes: childResults,
        mapped: true
      });
    });
    (0, _depthFirst.depthFirstPostOrder)(mapped, function (node) {
      if (!node.mapped) throw new Error('expecting all nodes to have been mapped');
    });
  });
});