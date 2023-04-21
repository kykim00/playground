import { useState, useMemo } from 'react';
import TanstackTable from '@/components/TanstackTable';
import useTable, { CellCondition } from '@/hooks/useTable';
import { useGetProducts } from '@/hooks/query/products/querys';
import { useRouter } from 'next/router';
import Pagination from './ui/pagination';
import { Product } from '@/schemas/product';
import useTableTooltipStore from '@/stores/tableTooltip';

export default function TablePage() {
  const router = useRouter();
  const currentPageFromQuery = Number(router.query.page ?? 1);
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: currentPageFromQuery,
    pageSize: 5,
  });

  const pagination = useMemo(
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
      options: [
        { id: '삼성', name: '삼성', label: '상성' },
        { id: '삼ㅇ성', name: '삼ㄹㄴㅇ성', label: '상성' },
        { id: '삼ㄹㅁㅇㄴ성', name: '삼ㄹㅇㄴ성', label: '상성' },
      ],
      isMultiple: true,
    },
  ];

  const totalSize = data ? Math.ceil(data.total / pageSize) : -1;

  const { tableRef, cpyData, updateCpyData, columns, rows, headers } = useTable({
    data: tableData,
    hideColumns,
    withCheckbox,
    cellConditions,
  });

  const addTableTooltipState = useTableTooltipStore(staet => staet.add);
  const validateSelectedValues = () => {
    let allValid = true;

    cpyData.forEach((row, rowIndex) => {
      cellConditions.forEach(condition => {
        if (condition.cellType === 'select' || condition.cellType === 'input') {
          const selectedValue = row[condition.column as keyof typeof row];
          if (!selectedValue || selectedValue === '') {
            allValid = false;
            addTableTooltipState(`${condition.column}-${rowIndex + 1}`);
          }
        }
      });
    });

    return allValid;
  };

  const handleButtonClick = () => {
    if (validateSelectedValues()) {
      console.log('Form is valid. Submitting...');
    }
  };

  return (
    <>
      <button onClick={handleButtonClick}>submit</button>
      <TanstackTable<Product> data={rows} columns={columns} updateData={updateCpyData} />
      <Pagination onClickPage={setPage} currentPageProps={currentPageFromQuery} totalPage={totalSize} />
    </>
  );
}
