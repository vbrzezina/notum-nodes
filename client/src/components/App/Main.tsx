import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from '@mui/material'
import ErrorComponent from '../ErrorBoundary/ErrorComponent'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import Loader from '../Loader'

const StyledMain = styled('main')`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 64px;
  padding: 24px;
`

export default function Main() {
  return (
    <StyledMain>
      <Suspense fallback={<Loader />}>
        <ErrorBoundary FallbackComponent={ErrorComponent}>
          <Outlet />
        </ErrorBoundary>
      </Suspense>
    </StyledMain>
  )
}
