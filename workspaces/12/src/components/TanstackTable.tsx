import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  RowData,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import { useCallback, useEffect, useReducer, useRef } from 'react';
import React from 'react';
import { Product } from '@/pages/api/table';

interface ReactTableProps {
  data: Product[];
  columns: ColumnDef<Product>[];
  showFooter: boolean;
}

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export const TanstackTable = ({ data, columns, showFooter }: ReactTableProps) => {
  const rerender = useReducer(() => ({}), {})[1];
  const refreshData = () => {};

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable({
    data,
    defaultColumn,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip age index reset until after next rerender
        skipAutoResetPageIndex();
        // setData(old =>
        //   old.map((row, index) => {
        //     if (index === rowIndex) {
        //       return {
        //         ...old[rowIndex]!,
        //         [columnId]: value,
        //       };
        //     }
        //     return row;
        //   }),
        // );
      },
    },
    debugTable: true,
  });
  return (
    <div className="flex flex-col">
      <table className="min-w-full text-center">
        <thead className="border-b bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="px-6 py-4 text-sm font-medium text-gray-900">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className='border-b" bg-white'>
              {row.getVisibleCells().map(cell => (
                <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
    </div>
  );
};

function useSkipper() {
  const shouldSkipRef = useRef(true);
  const shouldSkip = shouldSkipRef.current;

  const skip = useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

const defaultColumn: Partial<ColumnDef<Product>> = {
  cell: ({ getValue, row, column, table, renderValue }) => {
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(row.index, column.id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    const isInputRender = column.id !== 'id';
    return isInputRender ? (
      <input value={value as string} onChange={e => setValue(e.target.value)} onBlur={onBlur} />
    ) : (
      renderValue()
    );
  },
};
