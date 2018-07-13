import { EventEmitter } from 'events';

export default class DiffBatcher extends EventEmitter {

    constructor(options={ throttle:300 }) {
        super();
        this.options = options;
        this._batch = [];
        this._emitTimeout = false;
    }

    cleanup() {
        this.removeAllListeners();
        clearTimeout(this._emitTimeout);
    }

    push(diff) {
        if (!Array.isArray(diff)) diff = [diff];
        this._batch = [...this._batch, ...diff];
        if (!this._emitTimeout) {
            this._emitState();
            this._emitTimeout = setTimeout(() => {
                this._emitTimeout = false;
                this._emitState();
            }, this.options.throttle);
        }
    }

    _emitState() {
        if (this._batch.length) {
            this.emit('changes', this.peek());
        }
    }

    peek() {
        return [...this._batch];
    }

    clear() {
        this._batch = [];
        return this;
    }

}
