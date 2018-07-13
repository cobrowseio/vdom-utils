export default function depthFirst(node, visitor) {
    let skipChildren = false;
    const mapped = visitor(node, () => {
        skipChildren = true;
    });

    if (skipChildren || !node.childNodes) return mapped;

    return {
        ...mapped,
        childNodes: Array.from(node.childNodes).map(child => {
            return depthFirst(child, visitor);
        })
    };
}
