import depthFirst from './depthFirst';
import VirtualDOM from './VirtualDOM';

describe('VirtualDOM', function(){

    const patch = [
        { id: 'root', childNodes:[1,2,3] },
        { id: 1, value: 'one', childNodes: [4] },
        { id: 2, value: 'two' },
        { id: 3, value: 'three' },
        { id: 4, value: 'four' }
    ];


    let dom;
    beforeEach(() => {
        dom = new VirtualDOM('root');
    });

    it('should allow basic patching', function() {
        dom.applyPatch([{ id: 'root', patched: true }]);
        if (!dom.document.patched) throw new Error('expecting patched');
    });

    it('should build a tree from patches', function() {
        dom.applyPatch(patch);
        const nodes = [];
        depthFirst(dom.document, n => {
            nodes.push(n.id);
        });
        if (nodes.join(' ') !== ['root', 1, 4, 2, 3].join(' ')) throw new Error('wrong nodes');
    });

    it('should respect equality checking', function() {
        dom.applyPatch(patch);
        const startRoot = dom.document;
        const startOne = startRoot.childNodes[0];
        const startThree = startRoot.childNodes[2];
        const startFour = startOne.childNodes[0];

        dom.applyPatch([{id: 3, value:'THREE'}]);
        const newRoot = dom.document;
        const newOne = newRoot.childNodes[0];
        const newThree = newRoot.childNodes[2];
        const newFour = newOne.childNodes[0];

        if (newRoot === startRoot) throw new Error('expecting root change due to propagation');
        if (newOne !== startOne) throw new Error('not expecting change to 1');
        if (newThree === startThree) throw new Error('expecting change to 3');
        if (newThree.value !== 'THREE') throw new Error('expecting 3 value to be THREE');
        if (newFour !== startFour) throw new Error('not expecting change to 4');

        dom.applyPatch([{id: 4, value:'FOUR'}]);

        const newerRoot = dom.document;
        const newerOne = newerRoot.childNodes[0];
        const newerFour = newerOne.childNodes[0];

        if (newerFour === startFour) throw new Error('expecting change to 4');
        if (newerFour.value !== 'FOUR') throw new Error('expecting 4 value to be FOUR');
        if (newerOne === startOne) throw new Error('expecting change to 1');
        if (newerRoot === startRoot) throw new Error('expecting change to root');
    });

});
