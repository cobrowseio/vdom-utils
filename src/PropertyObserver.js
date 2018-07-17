
export default class PropertyObserver {

    constructor(onPropertySet) {
        this.onPropertySet = onPropertySet;
        this._overridden = [];
    }

    observe(Klass, property) {
        const self = this;
        if (Klass[`__cbio_override_${property}`]) return;
        Klass[`__cbio_override_${property}`] = true;
        this._overridden.push(Klass);

        const descriptor = Object.getOwnPropertyDescriptor(Klass.prototype, property);
        const originalSet = descriptor.set;

        descriptor.set = function(val) {
            originalSet.call(this, val);
            self.onPropertySet(this, property, val);
        };

        Object.defineProperty(Klass.prototype, property, descriptor);
    }

    disconnect() {
        // todo: disconnect logic
    }

}
