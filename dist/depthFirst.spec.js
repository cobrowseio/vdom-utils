'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _depthFirst = require('./depthFirst');

var _depthFirst2 = _interopRequireDefault(_depthFirst);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        (0, _depthFirst2.default)(tree, function (node) {
            if (progress >= node.id) throw new Error('wrong order ' + node.id);
            progress = node.id;
        });
        done();
    });

    it('should allow skipping subtrees', function (done) {
        var nodes = 0;
        (0, _depthFirst2.default)(tree, function (node, skip) {
            nodes += 1;
            skip();
        });
        if (nodes >= 2) throw new Error('wrong number of nodes');
        done();
    });

    it('should allow mapping to new values', function (done) {
        var mapped = (0, _depthFirst2.default)(tree, function (node) {
            return _extends({}, node, { mapped: true });
        });
        (0, _depthFirst2.default)(mapped, function (node) {
            if (!node.mapped) throw new Error('expecting all nodes to have been mapped');
        });
        done();
    });
});