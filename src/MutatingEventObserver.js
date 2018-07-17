
export default class MutatingEventObserver {

    constructor(onEvent) {
        this.onEvent = onEvent;

        this.onValueChangedEvent = this.onValueChangedEvent.bind(this);

        this._observing = [];
        this._windows = [];
    }

    observe(root) {
        root.addEventListener('scroll', this.onEvent, { capture: true, passive:true });
        root.addEventListener('change', this.onValueChangedEvent, { capture: true, passive:true });
        root.addEventListener('keydown', this.onValueChangedEvent, { capture: true, passive:true });
        root.addEventListener('keyup', this.onValueChangedEvent, { capture: true, passive:true });
        root.addEventListener('keypress', this.onValueChangedEvent, { capture: true, passive:true });
        this._observing.push(root);

        const document = root.ownerDocument || root;
        const window = document.defaultView;
        window.addEventListener('hashchange', this.onEvent, { capture: true, passive:true });
        window.addEventListener('resize', this.onEvent, { capture: true, passive:true });
        this._windows.push(window);
    }

    disconnect() {
        this._observing.forEach(root => {
            root.removeEventListener('scroll', this.onEvent, { capture: true, passive:true });
            root.removeEventListener('change', this.onValueChangedEvent, { capture: true, passive:true });
            root.removeEventListener('keydown', this.onValueChangedEvent, { capture: true, passive:true });
            root.removeEventListener('keyup', this.onValueChangedEvent, { capture: true, passive:true });
            root.removeEventListener('keypress', this.onValueChangedEvent, { capture: true, passive:true });
        });
        this._observing = [];

        this._windows.forEach(window => {
            window.removeEventListener('hashchange', this.onEvent, { capture: true, passive:true });
            window.removeEventListener('resize', this.onEvent, { capture: true, passive:true });
        });
        this._windows = [];
    }

    onValueChangedEvent(e) {
        if ((e.target.tagName === 'INPUT') || (e.target.tagName === 'TEXTAREA')) {
            this.onEvent(e);
        }
    }
}
