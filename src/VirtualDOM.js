import depthFirst, { depthFirstPostOrder } from './depthFirst';
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
            if (!n.id) console.warn('node missing id', n);
            else nodeIdMap[n.id] = n;
        });

        // then apply the diffs to the existing nodes,
        // and also create new node records for discovered
        // nodes if we need to.
        const modifiedNodesMap = {};
        patch.forEach(diff => {
            if (!diff.id) console.warn('diff missing id', diff);
            else {
                const existing = nodeIdMap[diff.id] || {};
                nodeIdMap[diff.id] = { ...existing, ...diff };
                modifiedNodesMap[diff.id] = nodeIdMap[diff.id];
            }
        });

        // then make sure all the node id's in the childNodes
        // array have been expanded into their denormalized form
        Object.values(modifiedNodesMap).forEach(n => {
            n.childNodes = (n.childNodes || []).map(child => {
                const id = child.id || child;
                if (!nodeIdMap[id]) {
                    throw new CompressionError(`denormalisation failed for child ${id}`, n);
                }
                return nodeIdMap[id];
            });
        });

        // for all modified nodes we want to make sure
        // all parent nodes also appear changed on equalty
        // comparison
        const root = nodeIdMap[document.id];
        depthFirstPostOrder(root, (n, childResults) => {
            const nodeWasModified = !!(modifiedNodesMap[n.id]);
            const childWasModified = childResults.reduce((a,b) => a||b, false);
            // if the node was modified or a child of the node was modified
            // then we need to ensure the current node will fail equality checks
            if (nodeWasModified || childWasModified) {
                // rebuild the node with the latest child versions
                nodeIdMap[n.id] = { ...n, childNodes: [...n.childNodes.map(c => nodeIdMap[c.id])] };
                return true;
            } else {
                return false;
            }
        });

        return nodeIdMap[document.id];
    }

}
