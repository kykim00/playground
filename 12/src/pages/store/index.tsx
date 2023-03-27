import BearCounterWithSubscribe from '@/components/BearCounterWithSubscribe';
import FishCounter from '@/components/FishCounter';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicBearCounter = dynamic(() => import('@/components/BearCounter'), { ssr: false });
const DynamicBearCounterWithSubScribe = dynamic(() => import('@/components/BearCounterWithSubscribe'), { ssr: false });
const DynamicFishCounter = dynamic(() => import('@/components/FishCounter'), { ssr: false });

const Page = () => {
  console.log('rerendered! in SSR');

  return (
    <>
      <h1>New Page</h1>
      <Suspense fallback={<h1>Loading...</h1>}>
        <DynamicBearCounter />
        <DynamicBearCounterWithSubScribe />
        <DynamicFishCounter />
      </Suspense>
    </>
  );
};

export default Page;
