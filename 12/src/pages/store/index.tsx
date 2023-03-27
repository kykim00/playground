import dynamic from 'next/dynamic';

const DynamicBearCounter = dynamic(() => import('@/components/BearCounter'), { ssr: false });

const Page = () => {
  console.log('rerendered! in SSR');

  return (
    <>
      <h1>New Page</h1>
      <DynamicBearCounter />
    </>
  );
};

export default Page;
