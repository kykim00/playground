import IndeterminateCheckbox from '@/components/ui/table/TableCheckbox';
import { translate } from '@/utils/translate';
import { ColumnDef } from '@tanstack/react-table';
import isEmpty from 'lodash/isEmpty';
import startCase from 'lodash/startCase';
import React, { useEffect } from 'react';

interface ShowInputCondType {
  columns?: string[];
  rows?: string[];
  cond?: (value: unknown) => boolean;
}

interface useTableProps<T extends object> {
  data: T[];
  showInputCond?: ShowInputCondType;
  hideColumns?: string[];
  withCheckbox?: boolean;
}
function useTable<T extends object>({ data, showInputCond, hideColumns, withCheckbox }: useTableProps<T>) {
  const keysOfData = Object.keys(data[0]).filter(key => !hideColumns?.includes(key));
  const [cpyData, setCpyData] = React.useState<T[]>([]);
  const tableRef = React.useRef();
  const headers = React.useMemo(() => keysOfData.map(key => Object.assign({ label: startCase(key), key })), [data]);
  const rows = React.useMemo(() => data, [data]);
  const columns = React.useMemo<ColumnDef<T>[]>(
    () =>
      keysOfData.map(key =>
        Object.assign({
          accessorKey: key,
          header: translate(key),
          cell: ({ getValue, row, column, table, renderValue }) => {
            const initialValue = getValue();
            const [value, setValue] = React.useState(initialValue);

            const onBlur = () => {
              updateCpyData(row.index, column.id, value as string);
            };

            React.useEffect(() => {
              setValue(initialValue);
            }, [initialValue]);

            const showInput = shouldShowInput(row.id.toString(), column.id, getValue(), showInputCond);

            return showInput ? (
              <input value={value as string} onChange={e => setValue(e.target.value)} onBlur={onBlur} />
            ) : (
              renderValue()
            );
          },
        } as ColumnDef<T>),
      ),
    [data],
  );
  if (withCheckbox) {
    columns.unshift({
      id: 'select',
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <div className="px-1">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    });
  }
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

  useEffect(() => {
    if (!isEmpty(data) && !isEmpty(data[0])) {
      setCpyData(data);
    }
  }, [data]);
  return { tableRef, cpyData, updateCpyData, columns, rows, headers };
}

function shouldShowInput(rowId: string, columnId: string, value: unknown, showInputCond?: ShowInputCondType): boolean {
  if (!showInputCond) {
    return false;
  }

  const { columns = [], rows = [], cond = _ => true } = showInputCond;

  return (
    (rows.length === 0 || rows.includes(rowId)) && cond(value) && (columns.length === 0 || columns.includes(columnId))
  );
}

export default useTable;
