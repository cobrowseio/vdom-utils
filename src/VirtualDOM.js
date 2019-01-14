import depthFirst from './depthFirst';
import CompressionError from './CompressionError';

export default class VirtualDOM {

    constructor(id) {
        this._id = id;
        this._dom = { id: id, childNodes:[] };
    }

    get id() {
        return this._id;
    }

    get document() {
        return this._dom;
    }

    applyPatch(patch) {
        this._dom = VirtualDOM.applyPatch(this._dom, patch);
        return this;
    }

    static applyPatch(document, patch) {
        // first build an index of the nodes currently
        // in the tree so we can quickly look them up.
        const nodeIdMap = {};
        depthFirst(document, n => {
            if (!n.id) console.warning('node missing id', n);
            else nodeIdMap[n.id] = n;
        });

        // then apply the diffs to the existing nodes,
        // and also create new node records for discovered
        // nodes if we need to.
        patch.forEach(diff => {
            if (!diff.id) console.warning('diff missing id', diff);
            else {
                const existing = nodeIdMap[diff.id] || {};
                nodeIdMap[diff.id] = { ...existing, ...diff };
            }
        });

        // then make sure all the node id's in the childNodes
        // array have been expanded into their denormalized form
        Object.values(nodeIdMap).forEach(n => {
            n.childNodes = n.childNodes || [];
            for (let i = 0; i < n.childNodes; i += 1) {
                const child = n.childNodes[i];
                // if child.id exists, the node hasn't been normalised
                // so do it now.
                if (child.id) {
                    // replace the object in the array with the id
                    n.childNodes[i] = child.id;
                    // also make sure the array object equality check will
                    // return false on shallow comparison.
                    n.childNodes = [...n.childNodes];
                }
                // validate the child node actually exists
                const id = child.id || child;
                if (!nodeIdMap[id]) {
                    throw new CompressionError(`denormalisation failed for child ${id}`, n);
                }
            }
        });

        return nodeIdMap[document.id];
    }

}
