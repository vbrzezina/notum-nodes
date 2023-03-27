import { Box, Button, css, Stack, styled, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextFieldElement } from 'react-hook-form-mui'
import { NodeDto } from '../../api'
import { spacing } from '../../styles/spacing'
import { Tree } from '../../types'
import { useDarkColor } from '../../utils/useDarkColor'
import ColorInputFieldElement from '../Form/ColorInputFieldElement'

const TileContent = styled('div', { shouldForwardProp: (prop) => prop !== 'color' })<{ color?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  min-height: 30px;
  padding: ${spacing(1.5)};
  margin: ${spacing(1)};
  background: ${({ color }) => color || 'white'};
  color: ${({ color, theme }) => (useDarkColor(color) ? theme.palette.text.primary : theme.palette.grey[200])};

  ${({ color, theme }) =>
    !useDarkColor(color) &&
    css`
      .MuiInputBase-root {
        color: ${theme.palette.grey[200]};

        .MuiOutlinedInput-notchedOutline {
          border-color: ${theme.palette.grey[200]};
        }

        &.Mui-focused .MuiOutlinedInput-notchedOutline,
        &:hover .MuiOutlinedInput-notchedOutline {
          border-color: ${theme.palette.common.white};
        }
      }

      .MuiFormLabel-root {
        color: ${theme.palette.grey[200]};

        &.Mui-focused {
          color: ${theme.palette.common.white};
        }
      }
    `}
`

const TileTitle = styled('div')`
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TileActions = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${spacing(3)};
  padding: ${spacing(2, 4)};
`

type MapTileProps = {
  node: Tree
  updateNode: (node: NodeDto) => void
  deleteNode: (nodeId: number) => void
}

/**
 * Component for displaying a single tile on the map. Tile represents one node.
 *  - Content of tile contains node's ID followed by brackets with number of all children if it has some.
 *  - Background color is by default "white" but it should be overwritten by node's color property.
 *  - On tile click the node should become active. If the node is already active, it should become inactive.
 *  - If the tile is active, it has red border and we see its description and `<MapTileActions />` component.
 */
export default function MapTile({ node, updateNode, deleteNode }: MapTileProps) {
  const [editOpen, setEditOpen] = useState(false)
  const toggleEditOpen = () => setEditOpen(!editOpen)

  const { control: colorizeControl, handleSubmit: handleColorizeSubmit } = useForm<NodeDto>({ defaultValues: node })
  const { control: createControl, handleSubmit: handleCreateSubmit } = useForm<NodeDto>({
    defaultValues: { parentId: node.id },
  })

  return (
    <Box flex={1}>
      <TileContent color={node.color}>
        <TileTitle onClick={toggleEditOpen}>
          <Typography>
            {node.id} {node.children.length ? `(${node.children.length})` : ''}
          </Typography>
          <Typography>{node.description}</Typography>
        </TileTitle>
        {editOpen ? (
          <TileActions>
            <Button variant='contained' onClick={() => deleteNode(node.id)}>
              Delete
            </Button>
            <form onSubmit={handleCreateSubmit(updateNode)}>
              <Stack direction='row' flex={1} gap={2}>
                <TextFieldElement control={createControl} fullWidth name='description' label='Description' required />
                <Button variant='contained' size='large' type='submit'>
                  Create
                </Button>
              </Stack>
            </form>
            <form onSubmit={handleColorizeSubmit(updateNode)}>
              <Stack direction='row' flex={1} gap={2}>
                <ColorInputFieldElement control={colorizeControl} fullWidth name='color' label='Color' required />
                <Button variant='contained' size='large' type='submit'>
                  Colorize
                </Button>
              </Stack>
            </form>
          </TileActions>
        ) : null}
      </TileContent>
      <Stack direction='row'>
        {node.children.map((node) => (
          <MapTile key={node.id} node={node} updateNode={updateNode} deleteNode={deleteNode} />
        ))}
      </Stack>
    </Box>
  )
}
