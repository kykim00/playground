import { PaginationParams } from '@/types/api/product';

export const productKeys = {
  all: ['products'] as const,
  pagination: (params: PaginationParams) =>
    [...productKeys.all, 'pagination', params.pageIndex, params.pageSize] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
};
