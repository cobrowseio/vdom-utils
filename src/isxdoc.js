
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
        // we count blank iframes as cross document as newly added iframe
        // will be about:blank even if it's will eventually be a xdoc iframe
        } else if (node.contentWindow.location.toString() === 'about:blank') {
            return true;
        }
    }
    return false;
}
