"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isxdoc;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

function isxdoc(node) {
  if (node.tagName !== 'IFRAME') return false;

  try {
    // we count blank iframes as cross document as newly added iframe
    // will be about:blank even if it's will eventually be a xdoc iframe
    if (node.contentWindow.location.toString() === 'about:blank') return true;
    return !node.contentWindow.document;
  } catch (e) {
    return true;
  }
}