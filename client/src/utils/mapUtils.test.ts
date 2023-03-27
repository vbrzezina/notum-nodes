import { NodeDto } from '../api'
import { applyColoring, arrangeNodes, getAllChildren, nodesListToTree } from './mapUtils'

describe('arrangeNodes', () => {
  it('should return an empty array when no nodes are provided', () => {
    expect(arrangeNodes([])).toEqual([])
  })

  it('should arrange nodes into a tree structure with colors', () => {
    const nodes: NodeDto[] = [
      { id: 1, description: 'Node 1', parentId: undefined, color: '#ccc' },
      { id: 2, description: 'Node 2', parentId: 1, color: '#ddd' },
      { id: 3, description: 'Node 3', parentId: 1 },
      { id: 4, description: 'Node 4', parentId: 2 },
    ]
    const expectedTree = [
      {
        id: 1,
        parentId: undefined,
        description: 'Node 1',
        color: '#ccc',
        children: [
          {
            id: 2,
            parentId: 1,
            description: 'Node 2',
            color: '#ddd',
            children: [{ id: 4, parentId: 2, description: 'Node 4', color: '#ddd', children: [] }],
          },
          { id: 3, parentId: 1, description: 'Node 3', color: '#ccc', children: [] },
        ],
      },
    ]

    expect(arrangeNodes(nodes)).toEqual(expectedTree)
  })
})

describe('getAllChildren', () => {
  const nodes: NodeDto[] = [
    { id: 1, parentId: undefined },
    { id: 2, parentId: 1 },
    { id: 3, parentId: 1 },
    { id: 4, parentId: 2 },
    { id: 5, parentId: 3 },
    { id: 6, parentId: 3 },
    { id: 7, parentId: 6 },
  ]

  it('should return all children of the given node', () => {
    const expected = [nodes[1], nodes[3], nodes[2], nodes[4], nodes[5], nodes[6]]
    expect(getAllChildren(nodes[0], nodes)).toEqual(expected)
  })

  it('should return an empty array if the given node has no children', () => {
    const expected: NodeDto[] = []
    expect(getAllChildren(nodes[3], nodes)).toEqual(expected)
  })

  it('should return an empty array if the given node is not in the list of nodes', () => {
    const expected: NodeDto[] = []
    expect(getAllChildren({ id: 8, parentId: 1 }, nodes)).toEqual(expected)
  })
})

describe('applyColoring', () => {
  it('should color nodes with the same color as their parent', () => {
    const nodes: NodeDto[] = [
      { id: 1, parentId: undefined },
      { id: 2, parentId: 1 },
      { id: 3, parentId: 1, color: 'red' },
      { id: 4, parentId: 2 },
      { id: 5, parentId: 3 },
      { id: 6, parentId: 3, color: 'red' },
      { id: 7, parentId: 6, color: 'red' },
      { id: 8, parentId: 7 },
    ]

    const expected = [
      { id: 1, parentId: undefined, color: undefined },
      { id: 2, parentId: 1, color: undefined },
      { id: 3, parentId: 1, color: 'red' },
      { id: 4, parentId: 2, color: undefined },
      { id: 5, parentId: 3, color: 'red' },
      { id: 6, parentId: 3, color: 'red' },
      { id: 7, parentId: 6, color: 'red' },
      { id: 8, parentId: 7, color: 'red' },
    ]
    expect(applyColoring(nodes)).toEqual(expected)
  })

  it('should not color nodes if any of their ancestors have no color', () => {
    const nodes: NodeDto[] = [
      { id: 1, parentId: undefined },
      { id: 2, parentId: 1 },
      { id: 3, parentId: 1, color: 'red' },
      { id: 4, parentId: 2 },
      { id: 5, parentId: 2 },
      { id: 6, parentId: 3 },
      { id: 7, parentId: 2 },
      { id: 8, parentId: 2 },
    ]

    const expected = [
      { id: 1, parentId: undefined, color: undefined },
      { id: 2, parentId: 1, color: undefined },
      { id: 3, parentId: 1, color: 'red' },
      { id: 4, parentId: 2, color: undefined },
      { id: 5, parentId: 2, color: undefined },
      { id: 6, parentId: 3, color: 'red' },
      { id: 7, parentId: 2, color: undefined },
      { id: 8, parentId: 2, color: undefined },
    ]

    expect(applyColoring(nodes)).toEqual(expected)
  })
})

describe('nodesListToTree', () => {
  it('returns an empty array if no nodes are provided', () => {
    const result = nodesListToTree([])
    expect(result).toEqual([])
  })

  it('returns a tree structure for a list of nodes with no parent', () => {
    const nodes = [
      { id: 1, name: 'Node 1', parentId: undefined },
      { id: 2, name: 'Node 2', parentId: undefined },
      { id: 3, name: 'Node 3', parentId: undefined },
    ]
    const expectedTree = [
      { id: 1, name: 'Node 1', parentId: undefined, children: [] },
      { id: 2, name: 'Node 2', parentId: undefined, children: [] },
      { id: 3, name: 'Node 3', parentId: undefined, children: [] },
    ]
    const result = nodesListToTree(nodes)
    expect(result).toEqual(expectedTree)
  })

  it('returns a tree structure for a list of nodes with a parent node', () => {
    const nodes = [
      { id: 1, name: 'Node 1', parentId: undefined },
      { id: 2, name: 'Node 2', parentId: undefined },
      { id: 3, name: 'Node 3', parentId: 1 },
      { id: 4, name: 'Node 4', parentId: 1 },
      { id: 5, name: 'Node 5', parentId: 2 },
    ]
    const expectedTree = [
      {
        id: 1,
        name: 'Node 1',
        parentId: undefined,
        children: [
          { id: 3, name: 'Node 3', parentId: 1, children: [] },
          { id: 4, name: 'Node 4', parentId: 1, children: [] },
        ],
      },
      {
        id: 2,
        name: 'Node 2',
        parentId: undefined,
        children: [{ id: 5, name: 'Node 5', parentId: 2, children: [] }],
      },
    ]
    const result = nodesListToTree(nodes)
    expect(result).toEqual(expectedTree)
  })
})
