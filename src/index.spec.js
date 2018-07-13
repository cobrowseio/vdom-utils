import {
    depthFirst,
    PatchCompressor,
    DiffBatcher
} from './index';

describe('index', function(){

    it('should export classes', function(done) {
        if (!depthFirst) throw new Error('expecting depthFirst');
        if (!DiffBatcher) throw new Error('expecting DiffBatcher');
        if (!PatchCompressor) throw new Error('expecting PatchCompressor');
        done();
    });

});
