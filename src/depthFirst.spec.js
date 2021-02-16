import depthFirst, { depthFirstPostOrder } from './depthFirst'

describe('depthFirst', function () {
  const tree = {
    id: 1,
    childNodes: [{
      id: 2,
      childNodes: [{
        id: 3
      }, {
        id: 4,
        childNodes: []
      }]
    }, {
      id: 5,
      childNodes: []
    }]
  }

  it('should traverse a tree', function () {
    let progress = 0
    depthFirst(tree, node => {
      if (progress >= node.id) throw new Error(`wrong order ${node.id}`)
      progress = node.id
    })
  })

  it('should allow skipping subtrees', function () {
    let nodes = 0
    depthFirst(tree, (node, skip) => {
      nodes += 1
      skip()
    })
    if (nodes >= 2) throw new Error('wrong number of nodes')
  })

  it('should allow pre order traversal', function () {
    const order = []
    depthFirst(tree, node => {
      order.push(node.id)
    })
    if (order.join(' ') !== [1, 2, 3, 4, 5].join(' ')) throw new Error('arrays not equal')
  })

  it('should allow pre order mapping', function () {
    const mapped = depthFirst(tree, node => {
      return { ...node, mapped: true }
    })
    depthFirst(mapped, node => {
      if (!node.mapped) throw new Error('expecting all nodes to have been mapped')
    })
  })

  it('should allow post order traversal', function () {
    const order = []
    depthFirstPostOrder(tree, node => {
      order.push(node.id)
    })
    if (order.join(' ') !== [3, 4, 2, 5, 1].join(' ')) throw new Error('arrays not equal')
  })

  it('should allow post order mapping', function () {
    const mapped = depthFirstPostOrder(tree, (node, childResults) => {
      return { ...node, childNodes: childResults, mapped: true }
    })
    depthFirstPostOrder(mapped, node => {
      if (!node.mapped) throw new Error('expecting all nodes to have been mapped')
    })
  })
})
