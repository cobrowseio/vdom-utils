"use strict";

var _depthFirst = _interopRequireDefault(require("./depthFirst"));

var _VirtualDOM = _interopRequireDefault(require("./VirtualDOM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('VirtualDOM', function () {
  var patch = [{
    id: 'root',
    childNodes: [1, 2, 3]
  }, {
    id: 1,
    value: 'one',
    childNodes: [4]
  }, {
    id: 2,
    value: 'two'
  }, {
    id: 3,
    value: 'three'
  }, {
    id: 4,
    value: 'four'
  }];
  var dom;
  beforeEach(function () {
    dom = new _VirtualDOM.default('root');
  });
  it('should allow basic patching', function () {
    dom.applyPatch([{
      id: 'root',
      patched: true
    }]);
    if (!dom.document.patched) throw new Error('expecting patched');
  });
  it('should build a tree from patches', function () {
    dom.applyPatch(patch);
    var nodes = [];
    (0, _depthFirst.default)(dom.document, function (n) {
      nodes.push(n.id);
    });
    if (nodes.join(' ') !== ['root', 1, 4, 2, 3].join(' ')) throw new Error('wrong nodes');
  });
  it('should respect equality checking', function () {
    dom.applyPatch(patch);
    var startRoot = dom.document;
    var startOne = startRoot.childNodes[0];
    var startThree = startRoot.childNodes[2];
    var startFour = startOne.childNodes[0];
    dom.applyPatch([{
      id: 3,
      value: 'THREE'
    }]);
    var newRoot = dom.document;
    var newOne = newRoot.childNodes[0];
    var newThree = newRoot.childNodes[2];
    var newFour = newOne.childNodes[0];
    if (newRoot === startRoot) throw new Error('expecting root change due to propagation');
    if (newOne !== startOne) throw new Error('not expecting change to 1');
    if (newThree === startThree) throw new Error('expecting change to 3');
    if (newFour !== startFour) throw new Error('not expecting change to 4');
  });
});