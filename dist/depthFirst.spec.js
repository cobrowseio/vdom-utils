"use strict";

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

var _depthFirst = _interopRequireDefault(require("./depthFirst"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  it('should traverse a tree', function (done) {
    var progress = 0;
    (0, _depthFirst.default)(tree, function (node) {
      if (progress >= node.id) throw new Error("wrong order ".concat(node.id));
      progress = node.id;
    });
    done();
  });
  it('should allow skipping subtrees', function (done) {
    var nodes = 0;
    (0, _depthFirst.default)(tree, function (node, skip) {
      nodes += 1;
      skip();
    });
    if (nodes >= 2) throw new Error('wrong number of nodes');
    done();
  });
  it('should allow mapping to new values', function (done) {
    var mapped = (0, _depthFirst.default)(tree, function (node) {
      return _objectSpread({}, node, {
        mapped: true
      });
    });
    (0, _depthFirst.default)(mapped, function (node) {
      if (!node.mapped) throw new Error('expecting all nodes to have been mapped');
    });
    done();
  });
});