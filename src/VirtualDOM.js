import depthFirst from './depthFirst';
import CompressionError from './CompressionError';

export default class VirtualDOM {

    constructor(id) {
        this._id = id;
        this._dom = { id: id };
    }

    get id() {
        return this._id;
    }

    applyPatches(patches) {
        this._dom = VirtualDOM.applyPatches(this._dom, patches);
    }

    static applyPatches(document, patches) {
        // first build an index of the nodes currently
        // in the tree so we can quickly look them up.
        const nodeIdMap = {};
        depthFirst(document, n => {
            if (n.id) nodeIdMap[n.id] = n;
        });

        // then apply the diffs to the existing nodes,
        // and also create new node records for discovered
        // nodes if we need to.
        patches.forEach(patch => {
            const existing = nodeIdMap[patch.id] || {};
            nodeIdMap[patch.id] = { ...existing, ...patch };
        });

        // then make sure all the node id's in the childNodes
        // array have been expanded into their denormalized form
        Object.values(nodeIdMap).forEach(n => {
            n.childNodes = n.childNodes.map(child => {
                const id = child.id || child;
                if (!nodeIdMap[id]) {
                    throw new CompressionError(`denormalisation failed for ${id}`);
                }
                return nodeIdMap[id];
            });
        });

        return nodeIdMap[document.id];
    }

}
