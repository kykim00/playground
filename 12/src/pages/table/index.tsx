import axios from 'axios';
import React from 'react';
import { CSVLink } from 'react-csv';
import ReactToPrint from 'react-to-print';
import { Product, Products } from '../api/table';
import { downloadExcel } from 'react-export-table-to-excel';
import TanstackTable from '@/components/TanstackTable';
import useTable from '@/hooks/useTable';
import { useQuery } from '@tanstack/react-query';

const getData = async () => {
  const res = await axios.get<Products>('https://dummyjson.com/products');
  return res.data;
};

export default function RT() {
  const { data } = useQuery<Products>(['Products'], getData);
  const tableData = data?.products ?? [{} as Product];
  const showInputCond = {
    columns: ['description'],
    rows: ['8', '9'],
  };
  const hideColumns = ['thumbnail', 'images'];
  const { tableRef, cpyData, updateCpyData, columns, rows, headers } = useTable(tableData, showInputCond, hideColumns);

  const [exportButtonDisabled, setExportButtonDisabled] = React.useState(false);

  const handleExport = () => {
    setExportButtonDisabled(true);

    if (!cpyData) {
      alert('추출할 데이터가 없습니다.');
      return;
    }

    downloadExcel({
      fileName: 'data.xlsx',
      sheet: 'sheet1',
      tablePayload: {
        header: Object.keys(cpyData[0]),
        body: cpyData.map(data => Object.values(data)),
      },
    });

    setTimeout(() => {
      setExportButtonDisabled(false);
    }, 1000);
  };

  if (!data || !cpyData) return;

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
      <TanstackTable<Product> columns={columns} data={rows} updateData={updateCpyData} />
    </>
  );
}
