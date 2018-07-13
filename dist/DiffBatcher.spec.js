'use strict';

var _DiffBatcher = require('./DiffBatcher');

var _DiffBatcher2 = _interopRequireDefault(_DiffBatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DiffBatcher', function () {

    it('should allow construction', function (done) {
        var batcher = new _DiffBatcher2.default();
        batcher.cleanup();
        done();
    });

    it('should batch emits', function (done) {
        var batcher = new _DiffBatcher2.default();
        batcher.push([{ id: 1 }]);
        setTimeout(function () {
            batcher.push({ id: 2 });
        }, 5);
        setTimeout(function () {
            batcher.push({ id: 1 });
        }, 10);
        setTimeout(function () {
            batcher.on('changes', function (changes) {
                if (changes.length !== 3) throw new Error('wrong number of changes');
                batcher.cleanup();
                done();
            });
        }, 20);
    });

    it('should allow peeking changes', function (done) {
        var batcher = new _DiffBatcher2.default();
        batcher.push([{ id: 1 }]);
        if (batcher.peek()[0].id !== 1) throw new Error('expecting id === 1');
        done();
    });

    it('should allow clearing changes', function (done) {
        var batcher = new _DiffBatcher2.default();
        batcher.push([{ id: 1 }]);
        batcher.clear();
        if (batcher.peek().length !== 0) throw new Error('expecting not changes');
        done();
    });
});