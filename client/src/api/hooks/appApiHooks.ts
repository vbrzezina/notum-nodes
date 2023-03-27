/* eslint-disable */
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AccessDto, AppApi, AppControllerLoginRequest, AppControllerSaveNodesRequest, NodesDto, UserDto } from '..'
import { config, getQueryKey } from '../client'

const apiService = new AppApi(config())

export const useLogin = (
  options?: Omit<UseMutationOptions<AccessDto, unknown, AppControllerLoginRequest>, 'mutationFn'>,
) => {
  return useMutation<AccessDto, unknown, AppControllerLoginRequest>(
    (variables) => apiService.appControllerLogin(variables),
    options,
  )
}

export const useGetMe = (options?: Omit<UseQueryOptions<UserDto, unknown>, 'queryKey' | 'queryFn'>) => {
  return useQuery<UserDto, unknown>(
    getQueryKey('me'),
    ({ signal }) => apiService.appControllerGetMe({ signal }),
    options,
  )
}

export const useGetNodes = (options?: Omit<UseQueryOptions<NodesDto, unknown>, 'queryKey' | 'queryFn'>) => {
  return useQuery<NodesDto, unknown>(
    getQueryKey('nodes'),
    ({ signal }) => apiService.appControllerGetNodes({ signal }),
    options,
  )
}

export const useSaveNodes = (
  options?: Omit<UseMutationOptions<NodesDto, unknown, AppControllerSaveNodesRequest>, 'mutationFn'>,
) => {
  return useMutation<NodesDto, unknown, AppControllerSaveNodesRequest>(
    (variables) => apiService.appControllerSaveNodes(variables),
    options,
  )
}
