import ApiErrorBoundary from '@/components/error/ApiErrorBoundary';
import ProductItem from '@/components/ProductItem';

const Page = () => {
  return (
    <ApiErrorBoundary>
      <ProductItem />
    </ApiErrorBoundary>
  );
};

export default Page;
