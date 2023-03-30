import {
  MutationFunction,
  QueryFunction,
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';
/**
 * @description useQuery 공통 함수
 * @param queryKey 쿼리 키
 * @param queryFunc 쿼리 함수
 * @param options useQuery의 옵션들
 * @returns useQuery(queryKey, queryFunc, { ...options })
 */
export const useCoreQuery = <T, U = null>(
  queryKey: QueryKey,
  queryFn: QueryFunction<T, QueryKey>,
  options?: Omit<UseQueryOptions<T, AxiosError, U extends null | undefined ? T : U>, 'queryKey' | 'queryFn'>,
): UseQueryResult<U extends null | undefined ? T : U, AxiosError> => {
  return useQuery({ queryKey, queryFn, ...options });
};

export const useCoreMutation = <T1, T2>(
  mutation: MutationFunction<T1, T2>,
  options?: UseMutationOptions<T1, AxiosError, T2>,
): UseMutationResult<T1, AxiosError, T2> => {
  return useMutation(mutation, { ...options });
};
