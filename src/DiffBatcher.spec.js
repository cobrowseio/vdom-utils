import DiffBatcher from './DiffBatcher';

describe('DiffBatcher', function(){

    it('should allow construction', function(done) {
        const batcher = new DiffBatcher();
        batcher.cleanup();
        done();
    });

    it('should batch emits', function(done) {
        const batcher = new DiffBatcher();
        batcher.push([{ id:1 }]);
        setTimeout(() => {
            batcher.push({ id:2 });
        }, 5);
        setTimeout(() => {
            batcher.push({ id:1 });
        }, 10);
        setTimeout(() => {
            batcher.on('changes', changes => {
                if (changes.length !== 3) throw new Error('wrong number of changes');
                batcher.cleanup();
                done();
            });
        }, 20);
    });

    it('should allow peeking changes', function(done) {
        const batcher = new DiffBatcher();
        batcher.push([{ id:1 }]);
        if (batcher.peek()[0].id !== 1) throw new Error('expecting id === 1');
        done();
    });

    it('should allow clearing changes', function(done) {
        const batcher = new DiffBatcher();
        batcher.push([{ id:1 }]);
        batcher.clear();
        if (batcher.peek().length !== 0) throw new Error('expecting not changes');
        done();
    });
});
