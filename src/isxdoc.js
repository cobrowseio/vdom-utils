
export default function isxdoc(node) {
    if (node.tagName !== 'IFRAME') return false;
    try {
        // we count blank iframes as cross document as newly added iframe
        // will be about:blank even if it's will eventually be a xdoc iframe
        if (node.contentWindow.location.toString() === 'about:blank') return true;
        return !node.contentWindow.document;
    } catch (e) {
        return true;
    }
}
