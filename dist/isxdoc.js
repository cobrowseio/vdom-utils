"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isxdoc;

function windowIsXdoc(window) {
  try {
    // try to access a property on the window
    return !window.document && false;
  } catch (e) {
    return true;
  }
}

function isxdoc(node) {
  if (windowIsXdoc(node)) {
    return true;
  } else if (node.tagName === 'IFRAME') {
    if (windowIsXdoc(node.contentWindow)) {
      return true;
    }
  }

  return false;
}