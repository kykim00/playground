import { useCoreQuery } from '@/hooks/core';
import { productKeys } from './queryKeys';
import { getProductData, getProductDetail } from '@/apis/product';
import { PaginationParams } from '@/types/api/product';
import isNumber from 'lodash/isNumber';

export const useGetProducts = (params: PaginationParams) => {
  return useCoreQuery(productKeys.pagination(params), () => getProductData(params), {
    enabled: isNumber(params.pageIndex),
    keepPreviousData: true,
  });
};

export const useGetProductDetail = (params: number) => {
  return useCoreQuery(productKeys.detail(params), () => getProductDetail(params), {
    enabled: params > 0,
    keepPreviousData: true,
  });
};
