export default function depthFirstPreOrder (node, visitor) {
  let children = node.childNodes
  const mapped = visitor(node, (replacementChildren = []) => { children = replacementChildren })

  if ((!children) || (!children.length)) return mapped

  return {
    ...mapped,
    childNodes: Array.from(children).map(child => {
      return depthFirstPreOrder(child, visitor)
    })
  }
}

export function depthFirstPostOrder (node, visitor) {
  const children = Array.from(node.childNodes || [])
  const childResults = children.map(child => depthFirstPostOrder(child, visitor))
  return visitor(node, childResults)
}
