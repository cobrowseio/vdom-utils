import {
    depthFirst,
    PatchCompressor
} from './index';

describe('index', function(){

    it('should export classes', function(done) {
        if (!depthFirst) throw new Error('expecting depthFirst');
        if (!PatchCompressor) throw new Error('expecting PatchCompressor');
        done();
    });

});
