import { getProductDetail } from '@/hooks/apis/products/fetchers';
import { productKeys } from '@/hooks/apis/products/queryKeys';
import { useGetProductDetail } from '@/hooks/apis/products/querys';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ProductItem = () => {
  const { query, isReady } = useRouter();
  const queryClient = useQueryClient();
  const [productId, setProductId] = useState<number>(-1);
  const { data } = useGetProductDetail(productId);

  useEffect(() => {
    if (isReady) {
      setProductId(Number(query.id));
    }
  }, [isReady]);

  useEffect(() => {
    const nextProductId = productId + 1;
    queryClient.prefetchQuery(productKeys.detail(nextProductId), () => getProductDetail(nextProductId));
  }, [productId]);

  return (
    <div>
      {Object.entries(data ?? {}).map(([key, value]) => (
        <div key={key}>
          {key} : {value.toString()}
        </div>
      ))}
      {productId > 1 && <button onClick={() => setProductId(prev => prev - 1)}>PREV</button>}
      <button onClick={() => setProductId(prev => prev + 1)}>NEXT</button>
    </div>
  );
};
export default ProductItem;
