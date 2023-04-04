import { productSchema, productsSchema } from '@/schemas/product';
import axios from 'axios';
import { Agent } from 'https';

export const getProductData = async () => {
  const res = await axios.get('/api/table');
  return productsSchema.parse(res.data);
};

export const getProductDetail = async (id: number) => {
  const res = await axios.get(`https://dummyjson.com/products/${id}`, {
    httpsAgent: new Agent({
      rejectUnauthorized: false,
    }),
  });
  return productSchema.parse(res.data);
};