'use strict';

var _index = require('./index');

describe('index', function () {

    it('should export classes', function (done) {
        if (!_index.depthFirst) throw new Error('expecting depthFirst');
        if (!_index.DiffBatcher) throw new Error('expecting DiffBatcher');
        if (!_index.DiffCompressor) throw new Error('expecting DiffCompressor');
        done();
    });
});