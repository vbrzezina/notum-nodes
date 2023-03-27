import { Box, CircularProgress } from '@mui/material'

export default function Loader() {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' flex={1}>
      <CircularProgress />
    </Box>
  )
}
