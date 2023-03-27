import { NodeDto } from '../api'
import { Tree } from '../types'

/**
 * Function takes nodes, apply coloring "layer" and convert them to tree structure.
 */
export const arrangeNodes = (nodes: NodeDto[]): Tree[] => {
  const colorizedNodes = applyColoring(nodes)
  return nodesListToTree(colorizedNodes)
}

/**
 * Useful function to return all children and their children etc. of given node. Basically it should return all nodes that are under given node.
 */
export const getAllChildren = (node: NodeDto, nodes: NodeDto[]): NodeDto[] => {
  const childNodes = nodes.filter((n) => n.parentId === node.id)
  const childrenWithChildNodes = childNodes.flatMap((node) => [node, ...getAllChildren(node, nodes)])

  return childrenWithChildNodes
}

/**
 * Apply coloring to nodes. Node can have its own color, otherwise it should be colored with the same color as its parent.
 *  - If parent doesn't have color, node should be colored with the same color as its grandparent etc.
 *  - If any of parents doesn't have color, node isn't colored.
 */
export const applyColoring = (nodes: NodeDto[]): NodeDto[] => {
  return nodes.map((node) => {
    const parent = nodes.find((n) => {
      return n.id === node.parentId
    })

    return { ...node, color: node.color || parent?.color }
  })
}

/**
 * Convert flat nodes list to tree structure, so every node will have its direct children.
 */
export const nodesListToTree = (nodes: NodeDto[], parentId?: number): Tree[] => {
  const treeNodes = nodes.filter(function (node) {
    return node.parentId === parentId
  })

  const tree = treeNodes.map(function (node) {
    const children = nodesListToTree(nodes, node.id)
    return { ...node, children }
  })

  return tree
}
