import { useState, useMemo } from 'react';
import TanstackTable from '@/components/TanstackTable';
import useTable, { CellCondition } from '@/hooks/useTable';
import { useGetProducts } from '@/hooks/query/products/querys';
import { useRouter } from 'next/router';
import Pagination from './ui/pagination';
import { Product } from '@/schemas/product';
import useTableTooltipStore from '@/stores/tableTooltip';
import styled from '@emotion/styled';
import { StyledTableHeaderCell } from './ui/table/StyledTableHeaderCell';
import { StyledTableCell } from './ui/table/StyledTableCell';

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

  const { tableRef, cpyData, updateCpyData, columns, rows, headers, checkedRows } = useTable({
    data: tableData,
    hideColumns,
    // withCheckbox,
    cellConditions,
  });

  const addTableTooltipState = useTableTooltipStore(state => state.add);
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
    } else {
      console.log(checkedRows);
    }
  };

  return (
    <>
      <button onClick={handleButtonClick}>submit</button>
      <TableWrapper>
        <LeftTable>
          <Table>
            <thead>
              <tr>
                <StyledTableHeaderCell>숫자</StyledTableHeaderCell>
                <StyledTableHeaderCell>예산 관리 대상 예산부서</StyledTableHeaderCell>
                <StyledTableHeaderCell>예산 관리 대상 계정과목</StyledTableHeaderCell>
              </tr>
            </thead>
            <tbody>
              <tr>
                <StyledTableCell groupingLineCount={3}>1</StyledTableCell>
                <StyledTableCell groupingLineCount={3}>구매팀</StyledTableCell>
                <StyledTableCell groupingLineCount={3}>여비교통비</StyledTableCell>
              </tr>
              <tr>
                <StyledTableCell groupingLineCount={3}>1</StyledTableCell>
                <StyledTableCell groupingLineCount={3}>구매팀</StyledTableCell>
                <StyledTableCell groupingLineCount={3}>여비교통비</StyledTableCell>
              </tr>
            </tbody>
          </Table>
        </LeftTable>
        <TanstackTable<Product> scrollable data={rows} columns={columns} />
      </TableWrapper>
      <Pagination onClickPage={setPage} currentPageProps={currentPageFromQuery} totalPage={totalSize} />
    </>
  );
}

const TableWrapper = styled.div`
  display: flex;
`;
const Table = styled.table`
  min-width: 100%;
  text-align: center;
  flex-shrink: 0;
`;
const LeftTable = styled.div``;
