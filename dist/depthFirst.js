"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = depthFirst;
function depthFirst(node, visitor) {
    var skipChildren = false;
    var mapped = visitor(node, function () {
        skipChildren = true;
    });

    if (skipChildren || !node.childNodes) return mapped;

    return _extends({}, mapped, {
        childNodes: Array.from(node.childNodes).map(function (child) {
            return depthFirst(child, visitor);
        })
    });
}
module.exports = exports["default"];