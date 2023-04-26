import { getCoreRowModel, useReactTable, flexRender, getFilteredRowModel, RowData } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import styled from '@emotion/styled';
import { StyledTableCell } from './ui/table/StyledTableCell';
import { StyledTableHeaderCell } from './ui/table/StyledTableHeaderCell';
import { css } from '@emotion/react';

interface ReactTableProps<T extends object & { id: string | number }> {
  data: T[];
  columns: ColumnDef<T>[];
  scrollable?: boolean;
}

function TanstackTable<T extends object & { id: string | number }>({
  data,
  columns,
  scrollable = false,
}: ReactTableProps<T>) {
  const [rowSelection, setRowSelection] = React.useState({});

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
    getRowId: originalRow => originalRow.id as string,
    debugTable: true,
  });

  return (
    <div style={{ overflowX: 'auto' }}>
      <Table className="min-w-full text-center" scrollable={scrollable}>
        <thead className="border-b bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <StyledTableHeaderCell key={header.id} className="px-6 py-4 text-sm font-medium text-gray-900">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </StyledTableHeaderCell>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className='border-b" bg-white'>
              {row.getVisibleCells().map(cell => (
                <StyledTableCell className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </StyledTableCell>
              ))}
            </tr>
          ))}
        </tbody>
        {/* <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(footer => (
                <StyledTableHeaderCell key={footer.id}>
                  {footer.isPlaceholder ? null : flexRender(footer.column.columnDef.footer, footer.getContext())}
                </StyledTableHeaderCell>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </Table>
    </div>
  );
}

const Table = styled.table<{ scrollable: boolean }>`
  min-width: 100%;
  text-align: center;
  ${({ scrollable }) =>
    scrollable &&
    css`
      overflow-x: auto;
    `}
`;
export default TanstackTable;
