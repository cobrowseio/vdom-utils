
export default function parents(node) {
    const found = [];
    let current = node;
    while (current.parentNode) {
        found.push(current.parentNode);
        current = current.parentNode;
    }
    const iframe = current.defaultView && current.defaultView.frameElement;
    if (iframe) return [...found, iframe, ...parents(iframe)];
    return found;
}
