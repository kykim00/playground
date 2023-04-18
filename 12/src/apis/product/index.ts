import { productSchema, productsSchema } from '@/schemas/product';
import { Agent } from 'https';
import { axiosInstance, productAxiosInstance } from '..';
import { PaginationParams } from '@/types/api/product';

export const getProductData = async (params: PaginationParams) => {
  const { pageIndex: skip, pageSize: limit } = params;
  const res = await productAxiosInstance.get(`?limit=${limit}&skip=${(skip - 1) * limit}`, {
    httpsAgent: new Agent({
      rejectUnauthorized: false,
    }),
  });
  return productsSchema.parse(res.data);
};

export const getProductDetail = async (id: number) => {
  const res = await productAxiosInstance.get(`${id}`, {
    httpsAgent: new Agent({
      rejectUnauthorized: false,
    }),
  });
  return productSchema.parse(res.data);
};
