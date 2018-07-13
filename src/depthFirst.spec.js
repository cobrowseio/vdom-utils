import depthFirst from './depthFirst';

describe('depthFirst', function(){

    const tree = {
        id: 1,
        childNodes: [{
            id: 2,
            childNodes:[{
                id:3
            },{
                id:4,
                childNodes:[]
            }]
        }, {
            id: 5,
            childNodes:[]
        }]
    };

    it('should traverse a tree', function(done) {
        let progress = 0;
        depthFirst(tree, node => {
            if (progress >= node.id) throw new Error(`wrong order ${node.id}`);
            progress = node.id;
        });
        done();
    });

    it('should allow skipping subtrees', function(done) {
        let nodes = 0;
        depthFirst(tree, (node, skip) => {
            nodes += 1;
            skip();
        });
        if (nodes >= 2) throw new Error('wrong number of nodes');
        done();
    });

    it('should allow mapping to new values', function(done) {
        const mapped = depthFirst(tree, node => {
            return { ...node, mapped: true };
        });
        depthFirst(mapped, node => {
            if (!node.mapped) throw new Error('expecting all nodes to have been mapped');
        });
        done();
    });

});
