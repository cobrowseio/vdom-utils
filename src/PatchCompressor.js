import eq from 'fast-deep-equal';

export default class PatchCompressor {

    constructor() {
        this.state = {};
    }

    difference(object, base) {
        if (!base) return object;
        return Object.keys(object).map(key => {
            if (eq(object[key], base[key])) return false;
            return { [key]: object[key] };
        }).filter(v => v).reduce((a,b,) => { return {...a,...b}; }, {});
    }

    compress(patch) {
        const nodes = {};
        patch.forEach(diff => {
            // generate the newest node state for each node altered by the patch
            nodes[diff.id] = {...nodes[diff.id], ...diff};
        });

        // then work out what's actually changed since the last state was persisted
        const compressed = Object.values(nodes).map(node => {
            const diff = this.difference(node, this.state[node.id]);
            if (Object.keys(diff).length === 0) return false;
            return { id: node.id, ...diff};
        });

        return Object.values(compressed).filter(v => v);
    }

    persist(patch) {
        const nodes = {};
        patch.forEach(diff => {
            this.state[diff.id] = {...this.state[diff.id], ...diff};
            nodes[diff.id] = {...nodes[diff.id], ...diff};
        });

        // run a sanity check to log any compression errors
        Object.values(nodes).forEach(node => {
            [...node.childNodes].forEach(id => {
                const inCompressed = this.state[id];
                if (!inCompressed) console.warn('child not in compressed state', id, node);
            });
        });
    }

    clearNodes(nodes=[]) {
        nodes.forEach(id => {
            this.state[id] = undefined;
        });
    }

    clear() {
        this.state = {};
    }
}
