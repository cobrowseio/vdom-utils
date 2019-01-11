"use strict";

require("core-js/modules/es6.array.find");

var _PatchCompressor = _interopRequireDefault(require("./PatchCompressor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('PatchCompressor', function () {
  it('should compress diffs', function (done) {
    var patch = [{
      id: 1,
      thing: 1,
      other: 2,
      childNodes: [2]
    }, {
      id: 2,
      thing: 3,
      other: 4
    }, {
      id: 3,
      thing: 5,
      boop: 'meep',
      other: 2,
      childNodes: []
    }, {
      id: 1,
      thing: 5,
      boop: 'meep',
      other: 2,
      childNodes: [2, 4]
    }, {
      id: 2,
      other: 5
    }, {
      id: 4,
      thing: 1,
      other: 1
    }];
    var compression = new _PatchCompressor.default();
    var result = compression.compress(patch);
    if (result.length !== 4) throw new Error('wrong number of nodes');
    var node1 = result.find(function (n) {
      return n.id === 1;
    });
    if (node1.thing !== 5) throw new Error('wrong thing value for node1');
    if (node1.boop !== 'meep') throw new Error('wrong meep value for node1');
    if (node1.childNodes[0] !== 2) throw new Error('wrong child for node1');
    var node2 = result.find(function (n) {
      return n.id === 2;
    });
    if (node2.thing !== 3) throw new Error('wrong thing value for node 2');
    if (node2.other !== 5) throw new Error('wrong other value for node 2');
    var node3 = result.find(function (n) {
      return n.id === 3;
    });
    if (node3.thing !== 5) throw new Error('wrong thing value for node 3');
    var node4 = result.find(function (n) {
      return n.id === 4;
    });
    if (node4.thing !== 1) throw new Error('wrong thing value for node 4');
    if (node4.other !== 1) throw new Error('wrong other value for node 4');
    done();
  });
  it('should clear attributes for null values', function (done) {
    var patch = [{
      id: 1,
      thing: 1,
      other: 2,
      childNodes: [2]
    }, {
      id: 2,
      thing: 3,
      other: 4
    }, {
      id: 1,
      thing: null
    }];
    var compression = new _PatchCompressor.default();
    var result = compression.compress(patch);
    if (result.length !== 2) throw new Error('wrong number of nodes');
    var node1 = result.find(function (n) {
      return n.id === 1;
    });
    if (node1.thing !== null) throw new Error('wrong thing value for node1');
    if (node1.other !== 2) throw new Error('wrong other value for node1');
    if (node1.childNodes.length !== 1) throw new Error('wrong child list value for node1');
    done();
  });
});