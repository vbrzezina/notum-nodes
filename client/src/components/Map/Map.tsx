import { useMemo } from 'react'
import { NodeDto } from '../../api'
import { arrangeNodes } from '../../utils/mapUtils'
import MapTile from './MapTile'

type MapProps = {
  nodes: NodeDto[]
  updateNode: (node: NodeDto) => void
  deleteNode: (nodeId: number) => void
}

export default function Map({ nodes, updateNode, deleteNode }: MapProps) {
  const tree = useMemo(() => arrangeNodes(nodes), [nodes])

  return (
    <>
      {tree.map((node) => (
        <MapTile key={node.id} node={node} updateNode={updateNode} deleteNode={deleteNode} />
      ))}
    </>
  )
}
