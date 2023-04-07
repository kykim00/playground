import { useCoreQuery } from '@/hooks/core';
import { PaginationParams } from '@/types/api/product';
import { fetchData } from '@/utils/fetchData';
import { mockKeys } from './queryKeys';

export const useGetMockData = (param: PaginationParams) => {
  return useCoreQuery(mockKeys.pagination(param), () => fetchData(param));
};
