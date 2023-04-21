import React from 'react';
import TanstackTable from '@/components/TanstackTable';
import useTable, { CellCondition, CellType } from '@/hooks/useTable';
import { useGetProducts } from '@/hooks/query/products/querys';
import { useRouter } from 'next/router';
import Pagination from './ui/pagination';
import { Product } from '@/schemas/product';

export default function TablePage() {
  const router = useRouter();
  const currentPageFromQuery = Number(router.query.page ?? 1);
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: currentPageFromQuery,
    pageSize: 5,
  });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const { data } = useGetProducts(pagination);
  const setPage = (nextPage: number) => {
    setPagination({
      ...pagination,
      pageIndex: nextPage,
    });
    router.push({
      query: {
        page: nextPage,
      },
    });
  };
  const tableData = data?.products ?? [{} as Product];
  const hideColumns = ['thumbnail', 'images'];
  const withCheckbox = true;
  const cellConditions: CellCondition[] = [
    {
      cellType: 'input',
      column: 'title',
      rows: ['2', '3'],
      condition: (value: unknown) => value !== '완료',
    },
    {
      cellType: 'select',
      column: 'description',
      rows: ['3', '4'],
      options: ['삼성', '애플', '엘지'],
      isMultiple: true,
    },
  ];

  const { tableRef, cpyData, updateCpyData, columns, rows, headers } = useTable({
    data: tableData,
    hideColumns,
    withCheckbox,
    cellConditions,
  });

  const totalSize = data ? Math.ceil(data.total / pageSize) : -1;

  return (
    <>
      <TanstackTable<Product> data={rows} columns={columns} updateData={updateCpyData} />
      <Pagination onClickPage={setPage} currentPageProps={currentPageFromQuery} totalPage={totalSize} />
    </>
  );
}
