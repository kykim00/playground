import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const TablePage = dynamic(() => import('@/components/TablePage'), {
  loading: () => <h1>Loading...</h1>,
  ssr: false,
});
export default function RT() {
  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <TablePage />
    </Suspense>
  );
}
