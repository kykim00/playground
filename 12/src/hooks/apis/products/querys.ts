import { useCoreQuery } from '@/hooks/core';
import { getProductData, getProductDetail } from './fetchers';
import { productKeys } from './queryKeys';

export const useGetProducts = () => {
  return useCoreQuery(productKeys.all, getProductData, { select: data => data.products });
};

export const useGetProductDetail = (params: number) => {
  return useCoreQuery(productKeys.detail(params), () => getProductDetail(params), {
    enabled: params > 0,
    keepPreviousData: true,
  });
};
