import { getCoreRowModel, useReactTable, flexRender, getFilteredRowModel, RowData } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/react-table';
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
}

function TanstackTable<T extends object & { id: string }>({ data, columns, updateData }: ReactTableProps<T>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
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
