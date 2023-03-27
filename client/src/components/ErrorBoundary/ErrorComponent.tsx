import { FallbackProps } from 'react-error-boundary'
import { ErrorOutline } from '@mui/icons-material'
import { Box, Button, Stack, Typography } from '@mui/material'

export default function ErrorComponent({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Stack flex={1} justifyContent='center' alignItems='center'>
      <ErrorOutline fontSize='medium' />
      <Typography variant='caption' mt={2}>
        There&apos;s been an error
      </Typography>
      {error.name === 'Network error' && (
        <Box mt={1}>
          <Button onClick={() => resetErrorBoundary()}>Try again</Button>
        </Box>
      )}
    </Stack>
  )
}
