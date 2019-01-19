import eq from 'fast-deep-equal';

export default class PatchCompressor {

    constructor() {
        this.state = {};
        this.modified = {};
    }

    difference(object, base) {
        if (!base) return { ...object};
        const changes =  Object.keys(object).map(key => {
            if (eq(object[key], base[key])) return false;
            return { [key]: object[key] };
        }).filter(v => v);

        // reduce back into an object
        return changes.reduce((a,b) => { return {...a,...b}; }, {});
    }

    compress() {
        // then work out what's actually changed since the last state was persisted
        const compressed = Object.values(this.modified).map(modified => {
            const diff = this.difference(modified, this.state[modified.id]);
            if (Object.keys(diff).length === 0) return false;
            return { id: modified.id, ...diff };
        }).filter(v => v);

        // run a sanity check to log any compression errors
        compressed.forEach(node => {
            (node.childNodes||[]).forEach(id => {
                const inCompressed = this.state[id] || this.modified[id];
                if (!inCompressed) console.warn('child not in compressed state', id, node);
            });
        });

        return compressed;
    }

    mark() {
        this.state = { ...this.state, ...this.modified };
        this.modified = {};
        return this;
    }

    push(patch) {
        patch.forEach(diff => {
            this.modified[diff.id] = {...this.state[diff.id], ...this.modified[diff.id], ...diff};
        });
        return this;
    }

    remove(nodes=[]) {
        nodes.forEach(id => {
            delete this.state[id];
            delete this.modified[id];
        });
        return this;
    }

    reset(newState=[]) {
        this.state = {};
        this.modified = {};
        this.push(newState);
        return this;
    }
}
