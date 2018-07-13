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

    get size() {
        return this._dom.size;
    }

    get scroll() {
        return this._dom.scroll;
    }

    html() {
        return this._dom.childNodes[0];
    }

    head() {
        const htmlNode = this.html();
        if ((!htmlNode) || (!htmlNode.childNodes)) return null;
        return htmlNode.childNodes.find(n => n.tagName === 'HEAD');
    }

    body() {
        const htmlNode = this.html();
        if ((!htmlNode) || (!htmlNode.childNodes)) return null;
        return htmlNode.childNodes.find(n => n.tagName === 'BODY');
    }

    applyPatches(patches) {
        this._dom = VirtualDOM.applyPatches(this._dom, patches);
        return this;
    }

    static applyPatches(document, patches) {
        // first build an index of the nodes currently
        // in the tree so we can quickly look them up.
        const nodeIdMap = {};
        depthFirst(document, n => {
            if (n.id) nodeIdMap[n.id] = { ...n };
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
