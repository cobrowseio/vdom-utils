
export default class CompressionError {

    constructor(message) {
        this._message = message;
    }

    get message() {
        return this._message;
    }

}
