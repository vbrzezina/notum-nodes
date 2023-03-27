import { ReactNode } from 'react'
import { FallbackProps, ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { QueryErrorResetBoundary } from '@tanstack/react-query'

interface ErrorBoundaryProps {
  children: ReactNode
  FallbackComponent: React.ComponentType<FallbackProps>
}

export default function ErrorBoundary({ children, FallbackComponent }: ErrorBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ReactErrorBoundary onReset={reset} FallbackComponent={FallbackComponent}>
          {children}
        </ReactErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
