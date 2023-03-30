import { useCoreQuery } from '@/hooks/core';
import getProductData from './fetchers';
import { productKeys } from './queryKeys';

export const useGetProducts = () => {
  return useCoreQuery(productKeys.all, getProductData, { select: data => data.products });
};
