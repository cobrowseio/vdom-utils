"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isxdoc;

function isxdoc(node) {
  if (node.tagName !== 'IFRAME') return false;

  try {
    return !node.contentWindow.document;
  } catch (e) {
    return true;
  }
}