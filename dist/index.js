"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CompressionError", {
  enumerable: true,
  get: function get() {
    return _CompressionError["default"];
  }
});
Object.defineProperty(exports, "VirtualDOM", {
  enumerable: true,
  get: function get() {
    return _VirtualDOM["default"];
  }
});
Object.defineProperty(exports, "depthFirst", {
  enumerable: true,
  get: function get() {
    return _depthFirst["default"];
  }
});
Object.defineProperty(exports, "depthFirstPostOrder", {
  enumerable: true,
  get: function get() {
    return _depthFirst.depthFirstPostOrder;
  }
});
Object.defineProperty(exports, "isxdoc", {
  enumerable: true,
  get: function get() {
    return _isxdoc["default"];
  }
});
Object.defineProperty(exports, "parents", {
  enumerable: true,
  get: function get() {
    return _parents["default"];
  }
});
Object.defineProperty(exports, "PropertyObserver", {
  enumerable: true,
  get: function get() {
    return _PropertyObserver["default"];
  }
});

var _CompressionError = _interopRequireDefault(require("./CompressionError"));

var _VirtualDOM = _interopRequireDefault(require("./VirtualDOM"));

var _depthFirst = _interopRequireWildcard(require("./depthFirst"));

var _isxdoc = _interopRequireDefault(require("./isxdoc"));

var _parents = _interopRequireDefault(require("./parents"));

var _PropertyObserver = _interopRequireDefault(require("./PropertyObserver"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }