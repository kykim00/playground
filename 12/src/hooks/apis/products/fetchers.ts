import { productsSchema } from '@/schemas/product';
import axios from 'axios';
import { Agent } from 'https';

const getProductData = async () => {
  const res = await axios.get('https://dummyjson.com/products', {
    // to avoid SELF_SIGNED_CERT_IN_CHAIN Error
    httpsAgent: new Agent({
      rejectUnauthorized: false,
    }),
  });
  return productsSchema.parse(res.data);
};

export default getProductData;
