
export default function isxdoc(node) {
    if (node.tagName !== 'IFRAME') return false;
    try {
        return !node.contentWindow.document;
    } catch (e) {
        return true;
    }
}
