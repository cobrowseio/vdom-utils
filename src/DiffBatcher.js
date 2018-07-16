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
        clearTimeout(this._shortEmitTimeout);
    }

    push(diff) {
        if (!Array.isArray(diff)) diff = [diff];
        this._batch = [...this._batch, ...diff];
        if (!this._emitTimeout) {
            // schedule next emit for a little while later
            this._emitTimeout = setTimeout(() => {
                this._emitTimeout = false;
                this._emitState();
            }, this.options.throttle);
            // also emit fairly immediately to keep things
            // feeling responsive
            if (!this._shortEmitTimeout) {
                this._shortEmitTimeout = setTimeout(() => {
                    this._shortEmitTimeout = false;
                    this._emitState();
                }, 10);
            }
        }
    }

    _emitState() {
        if (this._batch.length) {
            this.emit('patch', this.peek());
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
