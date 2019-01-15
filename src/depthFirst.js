export default function depthFirstPreOrder(node, visitor) {
    let skipChildren = false;
    const mapped = visitor(node, () => { skipChildren = true; });

    if (skipChildren || !node.childNodes) return mapped;

    return {
        ...mapped,
        childNodes: Array.from(node.childNodes).map(child => {
            return depthFirstPreOrder(child, visitor);
        })
    };
}

export function depthFirstPostOrder(node, visitor) {
    const children = Array.from(node.childNodes || []);
    const childResults = children.map(child => depthFirstPostOrder(child, visitor));
    return visitor(node, childResults);
}
