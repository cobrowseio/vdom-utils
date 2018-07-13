import {
    depthFirst,
    DiffCompressor,
    DiffBatcher
} from './index';

describe('index', function(){

    it('should export classes', function(done) {
        if (!depthFirst) throw new Error('expecting depthFirst');
        if (!DiffBatcher) throw new Error('expecting DiffBatcher');
        if (!DiffCompressor) throw new Error('expecting DiffCompressor');
        done();
    });

});
