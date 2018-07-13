
export default class DiffCompressor {

    static _merge(older={}, newer) {
        return {
            ...older,
            ...newer
        };
    }

    static compress(diff) {
        const nodes = {};
        diff.forEach(node => {
            nodes[node.id] = this._merge(nodes[node.id], node);
        });
        return Object.values(nodes).filter(v => v);
    }

}
