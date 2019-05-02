"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isxdoc;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

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
      return true; // we count blank iframes as cross document as newly added iframe
      // will be about:blank even if it's will eventually be a xdoc iframe
    } else if (node.contentWindow.location.toString() === 'about:blank') {
      return true;
    }
  }

  return false;
}