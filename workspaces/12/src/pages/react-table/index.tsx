import Table from '@/components/Table';
import axios from 'axios';
import { startCase } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import ReactToPrint from 'react-to-print';
import { Product, Products } from '../api/table';
import { downloadExcel } from 'react-export-table-to-excel';
import { TanstackTable } from '@/components/TanstackTable';
import { ColumnDef } from '@tanstack/react-table';

export default function RT() {
  const tableRef = useRef();

  const [data, setData] = useState<Products>();
  const [cpyData, setCpyData] = React.useState<Product[]>();
  const [skipPageReset, setSkipPageReset] = React.useState(false);
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
  const updateMyData = (rowIndex: number, columnId: number, value: string) => {
    setSkipPageReset(true);
    setCpyData(old => {
      if (!old) return old;
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      });
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (data) return;
    try {
      const res = await axios.get<Products>('https://dummyjson.com/products');
      setData(res.data);
      setCpyData(res.data.products);
    } catch (e) {
      console.log(e);
    }
  };
  const columns = useMemo(
    () =>
      Object.keys(data?.products[0] || []).map(key =>
        Object.assign({ accessor: key, Header: key.toLocaleUpperCase(), sortType: 'basic' }),
      ),
    [data],
  );
  const newColumns = useMemo<ColumnDef<Product>[]>(
    () =>
      Object.entries(data?.products[0] || []).map(([key, value]) =>
        Object.assign({
          accessorKey: key,
          header: key.toLocaleUpperCase(),
          footer: value,
        }),
      ),
    [data],
  );
  const rows = useMemo(() => data?.products ?? [], [data]);
  const headers = useMemo(
    () => Object.keys(data?.products[0] || []).map(key => Object.assign({ label: startCase(key), key })),
    [data],
  );
  if (!data || !cpyData) return;

  return (
    <>
      <CSVLink
        data={cpyData}
        headers={headers}
        // confirm 창에서 '확인'을 눌렀을 때만 csv 파일 다운로드
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
      <TanstackTable columns={newColumns} data={rows} showFooter />
      {/* <Table columns={columns} data={rows} updateMyData={updateMyData} skipPageReset={skipPageReset} ref={tableRef} /> */}
    </>
  );
}

// import React from 'react';
// import styled from '@emotion/styled';
// import { useTable, usePagination } from 'react-table';

// import makeData from './makeData';

// const Styles = styled.div`
//   padding: 1rem;

//   table {
//     border-spacing: 0;
//     border: 1px solid black;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }

//       input {
//         font-size: 1rem;
//         padding: 0;
//         margin: 0;
//         border: 0;
//       }
//     }
//   }

//   .pagination {
//     padding: 0.5rem;
//   }
// `;

// // Create an editable cell renderer
// const EditableCell = ({
//   value: initialValue,
//   row: { index },
//   column: { id },
//   updateMyData, // This is a custom function that we supplied to our table instance
// }) => {
//   // We need to keep and update the state of the cell normally
//   const [value, setValue] = React.useState(initialValue);

//   const onChange = e => {
//     setValue(e.target.value);
//   };

//   // We'll only update the external data when the input is blurred
//   const onBlur = () => {
//     updateMyData(index, id, value);
//   };

//   // If the initialValue is changed external, sync it up with our state
//   React.useEffect(() => {
//     setValue(initialValue);
//   }, [initialValue]);

//   return <input value={value} onChange={onChange} onBlur={onBlur} />;
// };

// // Set our editable cell renderer as the default Cell renderer
// const defaultColumn = {
//   Cell: EditableCell,
// };

// // Be sure to pass our updateMyData and the skipPageReset option
// function Table({ columns, data, updateMyData, skipPageReset }) {
//   // For this example, we're using pagination to illustrate how to stop
//   // the current page from resetting when our data changes
//   // Otherwise, nothing is different here.
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     prepareRow,
//     page,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     state: { pageIndex, pageSize },
//   } = useTable(
//     {
//       columns,
//       data,
//       defaultColumn,
//       // use the skipPageReset option to disable page resetting temporarily
//       autoResetPage: !skipPageReset,
//       // updateMyData isn't part of the API, but
//       // anything we put into these options will
//       // automatically be available on the instance.
//       // That way we can call this function from our
//       // cell renderer!
//       updateMyData,
//     },
//     usePagination,
//   );

//   // Render the UI for your table
//   return (
//     <>
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map(headerGroup => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map(column => (
//                 <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {page.map((row, i) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map(cell => {
//                   return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <div className="pagination">
//         <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
//           {'<<'}
//         </button>{' '}
//         <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//           {'<'}
//         </button>{' '}
//         <button onClick={() => nextPage()} disabled={!canNextPage}>
//           {'>'}
//         </button>{' '}
//         <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
//           {'>>'}
//         </button>{' '}
//         <span>
//           Page{' '}
//           <strong>
//             {pageIndex + 1} of {pageOptions.length}
//           </strong>{' '}
//         </span>
//         <span>
//           | Go to page:{' '}
//           <input
//             type="number"
//             defaultValue={pageIndex + 1}
//             onChange={e => {
//               const page = e.target.value ? Number(e.target.value) - 1 : 0;
//               gotoPage(page);
//             }}
//             style={{ width: '100px' }}
//           />
//         </span>{' '}
//         <select
//           value={pageSize}
//           onChange={e => {
//             setPageSize(Number(e.target.value));
//           }}
//         >
//           {[10, 20, 30, 40, 50].map(pageSize => (
//             <option key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </select>
//       </div>
//     </>
//   );
// }

// function App() {
//   const columns = React.useMemo(
//     () => [
//       {
//         Header: 'Name',
//         columns: [
//           {
//             Header: 'First Name',
//             accessor: 'firstName',
//           },
//           {
//             Header: 'Last Name',
//             accessor: 'lastName',
//           },
//         ],
//       },
//       {
//         Header: 'Info',
//         columns: [
//           {
//             Header: 'Age',
//             accessor: 'age',
//           },
//           {
//             Header: 'Visits',
//             accessor: 'visits',
//           },
//           {
//             Header: 'Status',
//             accessor: 'status',
//           },
//           {
//             Header: 'Profile Progress',
//             accessor: 'progress',
//           },
//         ],
//       },
//     ],
//     [],
//   );

//   const [data, setData] = React.useState(() => makeData(20));
//   const [originalData] = React.useState(data);
//   const [skipPageReset, setSkipPageReset] = React.useState(false);

//   // We need to keep the table from resetting the pageIndex when we
//   // Update data. So we can keep track of that flag with a ref.

//   // When our cell renderer calls updateMyData, we'll use
//   // the rowIndex, columnId and new value to update the
//   // original data
//   const updateMyData = (rowIndex, columnId, value) => {
//     // We also turn on the flag to not reset the page
//     setSkipPageReset(true);
//     setData(old =>
//       old.map((row, index) => {
//         if (index === rowIndex) {
//           return {
//             ...old[rowIndex],
//             [columnId]: value,
//           };
//         }
//         return row;
//       }),
//     );
//   };

//   // After data chagnes, we turn the flag back off
//   // so that if data actually changes when we're not
//   // editing it, the page is reset
//   React.useEffect(() => {
//     setSkipPageReset(false);
//   }, [data]);

//   // Let's add a data resetter/randomizer to help
//   // illustrate that flow...
//   const resetData = () => setData(originalData);

//   return (
//     <Styles>
//       <button onClick={resetData}>Reset Data</button>
//       <Table columns={columns} data={data} updateMyData={updateMyData} skipPageReset={skipPageReset} />
//     </Styles>
//   );
// }

// export default App;
