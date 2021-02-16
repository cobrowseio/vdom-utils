
export default class PropertyObserver {
  constructor (onPropertySet) {
    this.onPropertySet = onPropertySet
    this._klasses = new Set()
  }

  _trackObserver (Klass) {
    if (!Klass.__cbio_observers) Klass.__cbio_observers = new Set()
    Klass.__cbio_observers.add(this)
  }

  _untrackObserver (Klass) {
    if (Klass.__cbio_observers) {
      Klass.__cbio_observers.delete(this)
    }
  }

  _tap (Klass, property) {
    if (Klass[`__cbio_override_${property}`]) return
    Klass[`__cbio_override_${property}`] = true

    const descriptor = Object.getOwnPropertyDescriptor(Klass.prototype, property)
    const originalSet = descriptor.set

    descriptor.set = function (val) {
      originalSet.call(this, val)
      if (Klass.__cbio_observers) {
        Klass.__cbio_observers.forEach(observer => {
          observer.onPropertySet(this, property, val)
        })
      }
    }

    Object.defineProperty(Klass.prototype, property, descriptor)
  }

  observe (Klass, property) {
    this._klasses.add(Klass)
    this._trackObserver(Klass)
    this._tap(Klass, property)
  }

  disconnect () {
    this._klasses.forEach(Klass => this._untrackObserver(Klass))
    this._klasses.clear()
  }
}
