import depthFirst, { depthFirstPostOrder } from './depthFirst'
import CompressionError from './CompressionError'

export default class VirtualDOM {
  constructor (id) {
    this._id = id
    this._dom = { id: id, childNodes: [] }
    this._mapping = {}
  }

  get id () {
    return this._id
  }

  get document () {
    return this._dom
  }

  node (id) {
    return this._mapping[id]
  }

  applyPatch (patch) {
    const { dom, mapping } = VirtualDOM.applyPatch(this._dom, patch)
    this._dom = dom
    this._mapping = mapping
    return this
  }

  static createMapping (node) {
    const mapping = {}
    depthFirst(node, n => {
      if (!n.id) console.warn('node missing id', n)
      else mapping[n.id] = n
    })
    return mapping
  }

  static applyPatch (document, patch) {
    // first build an index of the nodes id we need to
    // update so we can quickly look them up.
    const nodeIdMap = this.createMapping(document)

    // then apply the diffs to the existing nodes,
    // and also create new node records for discovered
    // nodes if we need to.
    const modifiedNodesMap = {}
    patch.forEach(diff => {
      if (!diff.id) console.warn('diff missing id', diff)
      else {
        const existing = nodeIdMap[diff.id] || {}
        nodeIdMap[diff.id] = { ...existing, ...diff }
        modifiedNodesMap[diff.id] = true
      }
    })

    // then make sure all the node id's in the childNodes
    // arrays have been expanded into their denormalized form
    // and the childNodes arrays are using the modified nodes
    Object.values(nodeIdMap).forEach(n => {
      n.childNodes = (n.childNodes || []).map(child => {
        const id = child.id || child
        const node = nodeIdMap[id]
        if (!node) throw new CompressionError(`denormalisation failed for child ${id}`, n)
        return node
      })
    })

    // for all modified nodes we want to make sure
    // all parent nodes also appear changed on equalty
    // comparison
    const root = nodeIdMap[document.id]
    const result = depthFirstPostOrder(root, (n, children) => {
      // make sure we're using any updated nodes returned from
      // our children
      n.childNodes = children

      // work out of any of our chidren were modified
      const modified = children.map(c => modifiedNodesMap[c.id])
      const childWasModified = modified.reduce((a, b) => a || b, false)
      if (childWasModified) {
        // if a child was modified, we count as modified too, so make sure
        // the ndoe is marked in the modification table
        modifiedNodesMap[n.id] = true
        // if the node was modified or a child of the node was modified
        // then we need to ensure the current node will fail equality checks
        const updated = { ...n }
        nodeIdMap[n.id] = updated
        return updated
      }
      return n
    })

    // retain the latest node id mapping for quick lookups
    return { dom: result, mapping: this.createMapping(result) }
  }
}
