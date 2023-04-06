import React from 'react';
import { CSVLink } from 'react-csv';
import ReactToPrint from 'react-to-print';
import { Product } from '../pages/api/table';
import { downloadExcel } from 'react-export-table-to-excel';
import TanstackTable from '@/components/TanstackTable';
import useTable from '@/hooks/useTable';
import { useGetProducts } from '@/hooks/query/products/querys';

export default function TablePage() {
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const fetchOption = {
    pageIndex,
    pageSize,
  };
  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const { data } = useGetProducts(fetchOption);
  const tableData = data?.products ?? [{} as Product];
  const showInputCond = {
    columns: ['description'],
    rows: ['8', '9'],
  };
  const hideColumns = ['thumbnail', 'images'];
  const withCheckbox = true;
  const { tableRef, cpyData, updateCpyData, columns, rows, headers } = useTable({
    data: tableData,
    showInputCond,
    hideColumns,
    withCheckbox,
  });

  const [exportButtonDisabled, setExportButtonDisabled] = React.useState(false);

  const handleExport = () => {
    setExportButtonDisabled(true);

    if (!cpyData) {
      alert('추출할 데이터가 없습니다.');
      return;
    }

    const header = Object.keys(cpyData[0]);
    const body = cpyData.map(data => Object.values(data).map(value => value.toString()));

    downloadExcel({
      fileName: 'data.xlsx',
      sheet: 'sheet1',
      tablePayload: {
        header,
        body,
      },
    });

    setTimeout(() => {
      setExportButtonDisabled(false);
    }, 1000);
  };

  const totalSize = data ? Math.ceil(data.total / pageSize) : -1;
  return (
    <>
      <CSVLink
        data={cpyData}
        headers={headers}
        onClick={() => {
          if (confirm('csv파일을 다운로드 받겠습니까?')) {
            return true;
          } else {
            return false;
          }
        }}
        filename={`목데이터_테이블}`}
      >
        CSV 다운로드
      </CSVLink>
      <button disabled={exportButtonDisabled} onClick={handleExport}>
        {exportButtonDisabled ? '다운로드중...' : 'Export to Excel'}
      </button>
      <ReactToPrint trigger={() => <button>리포트 출력</button>} content={() => tableRef.current!} />
      <TanstackTable<Product>
        columns={columns}
        data={rows}
        updateData={updateCpyData}
        pagination={pagination}
        setPagination={setPagination}
        totalPage={totalSize}
      />
    </>
  );
}
