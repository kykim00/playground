import { ColumnDef } from '@tanstack/react-table';
import startCase from 'lodash/startCase';
import React from 'react';

interface ShowInputCondType {
  columns?: string[];
  rows?: string[];
}

function useTable<T extends object>(data: T[], showInputCond?: ShowInputCondType, hideColumns?: string[]) {
  const keysOfData = Object.keys(data[0]).filter(key => !hideColumns?.includes(key));
  const [cpyData, setCpyData] = React.useState(data);
  const tableRef = React.useRef();
  const headers = React.useMemo(() => keysOfData.map(key => Object.assign({ label: startCase(key), key })), [data]);
  const rows = React.useMemo(() => data, [data]);
  const columns = React.useMemo<ColumnDef<T>[]>(
    () =>
      keysOfData.map(key =>
        Object.assign({
          accessorKey: key,
          header: startCase(key),
          cell: ({ getValue, row, column, table, renderValue }) => {
            const initialValue = getValue();
            const [value, setValue] = React.useState(initialValue);

            const onBlur = () => {
              table.options.meta?.updateData(row.index, column.id, value);
            };

            React.useEffect(() => {
              setValue(initialValue);
            }, [initialValue]);

            const shoInput = shouldShowInput(row.id, column.id, showInputCond);
            return shoInput ? (
              <input value={value as string} onChange={e => setValue(e.target.value)} onBlur={onBlur} />
            ) : (
              renderValue()
            );
          },
        } as ColumnDef<T>),
      ),
    [data],
  );
  const updateCpyData = (rowIndex: number, columnId: string, value: string) => {
    const updatedCpyData = cpyData.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...cpyData[rowIndex],
          [columnId]: value,
        };
      }
      return row;
    });
    setCpyData(updatedCpyData);
  };

  return { tableRef, cpyData, updateCpyData, columns, rows, headers };
}

function shouldShowInput(rowId: string, columnId: string, showInputCond?: ShowInputCondType): boolean {
  if (!showInputCond) {
    return false;
  }
  const { columns = [], rows = [] } = showInputCond;
  return (rows.length === 0 || rows.includes(rowId)) && (columns.length === 0 || columns.includes(columnId));
}

export default useTable;
