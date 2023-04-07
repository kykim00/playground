import { PaginationParams } from '@/types/api/product';
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  RowData,
} from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/react-table';
import { useCallback, useEffect, useReducer, useRef } from 'react';
import React from 'react';
import styled from '@emotion/styled';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

interface ReactTableProps<T extends object & { id: string }> {
  data: T[];
  columns: ColumnDef<T>[];
  updateData: (rowIndex: number, columnId: string, value: string) => void;
  pagination: PaginationParams;
  setPagination: React.Dispatch<React.SetStateAction<PaginationParams>>;
  totalPage: number;
}

function TanstackTable<T extends object & { id: string }>({
  data,
  columns,
  updateData,
  pagination,
  setPagination,
  totalPage,
}: ReactTableProps<T>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      pagination,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    pageCount: totalPage,
    onPaginationChange: data => {
      setPagination(data);
      setRowSelection({});
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        updateData(rowIndex, columnId, value as string);
      },
    },
    getRowId: originalRow => originalRow.id,
    debugTable: true,
  });
  return (
    <div className="flex flex-col">
      <Table className="min-w-full text-center">
        <thead className="border-b bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHeaderCell key={header.id} className="px-6 py-4 text-sm font-medium text-gray-900">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHeaderCell>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className='border-b" bg-white'>
              {row.getVisibleCells().map(cell => (
                <TableCell className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button className="border rounded p-1" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
    </div>
  );
}

const Table = styled.table`
  min-width: 100%;
  text-align: center;
`;
const TableHeaderCell = styled.th`
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
`;
const TableCell = styled.td`
  white-space: nowrap;
  padding: 8px 12px;
  font-size: 12px;
  input[type='checkbox'] {
    margin-top: 2px;
  }
`;
export default TanstackTable;
