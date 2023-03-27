import { Box, Stack, Typography } from '@mui/material'
import { NodeDto, useGetNodes, useSaveNodes } from '../api'
import Map from '../components/Map/Map'

/**
 * This Map component renders whole map (their nodes) - see readme for better visual imagination.
 * Basically, it renders all nodes and handle saving.
 */
export default function Nodes() {
  const { data: nodes, refetch } = useGetNodes({})

  const { mutate } = useSaveNodes({
    onSuccess: () => {
      refetch()
    },
  })

  const deleteNode = (nodeId: number) => {
    const updatedNodes = nodes!.nodes.filter((n) => n.id !== nodeId)

    mutate({ NodesDto: { nodes: updatedNodes } })
  }

  const updateNode = (node: NodeDto) => {
    const updatedNodes = nodes!.nodes

    if (node.id) {
      updatedNodes.splice(
        nodes!.nodes.findIndex((n) => n.id === node.id),
        1,
        node,
      )
    } else {
      const lastId = nodes!.nodes.at(-1)!.id
      updatedNodes.push({ ...node, id: lastId + 1 })
    }

    mutate({ NodesDto: { nodes: updatedNodes } })
  }

  if (!nodes) {
    return null
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='h5' gutterBottom>
        🤗 Wonderful nodes 🚀
      </Typography>
      <Typography variant='h6' gutterBottom>
        Welcome
      </Typography>
      <Stack direction='column'>
        <Map nodes={nodes.nodes} updateNode={updateNode} deleteNode={deleteNode} />
      </Stack>
    </Box>
  )
}
