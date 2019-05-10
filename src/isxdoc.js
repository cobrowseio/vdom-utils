
function windowIsXdoc(window) {
    try {
        // try to access a property on the window
        return (!window.document) && false;
    } catch (e) {
        return true;
    }
}

export default function isxdoc(node) {
    if (windowIsXdoc(node)) {
        return true;
    } else if (node.tagName === 'IFRAME') {
        if (windowIsXdoc(node.contentWindow)) {
            return true;
        }
    }
    return false;
}
