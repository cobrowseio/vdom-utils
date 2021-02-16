
export default class CompressionError {
  constructor (message, node) {
    this._message = message
    this._node = node
  }

  get message () {
    return this._message
  }

  get node () {
    return this._node
  }
}
