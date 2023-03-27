import { QueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { Configuration, ResponseError } from './runtime'

export type Queries = 'nodes' | 'me'
export type Mutations = 'login' | 'saveNodes'

// TODO: Consider variables - path params, query params that should be part of the query key
export const getQueryKey = (query: Queries) => [query]

/**
 * This configuration is used to initialize AppApi instance.
 */
export const config = () => {
  return new Configuration({
    basePath: 'http://localhost:3002',
    accessToken: () => Cookies.get('access_token')!,
  })
}

/**
 * Try to use https://tanstack.com/query/v4 to fetch data from API.
 * Create your custom hooks here and use them in components.
 * Typescript types and api call are generated in `api/` folder.
 */

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry: false,
      useErrorBoundary(error) {
        return !(error instanceof ResponseError && error.response.status === 401)
      },
    },
  },
})
