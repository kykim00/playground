import { PaginationParams } from '@/types/api/product';

export const mockKeys = {
  all: ['mock'],
  pagination: (param: PaginationParams) => [...mockKeys.all, param],
};
