import { OptionValue } from '@/components/ui/select/select-v2';
import IndeterminateCheckbox from '@/components/ui/table/TableCheckbox';
import useTableTooltipStore, { useTableTooltips } from '@/stores/tableTooltip';
import { translate } from '@/utils/translate';
import { ColumnDef } from '@tanstack/react-table';
import isEmpty from 'lodash/isEmpty';
import startCase from 'lodash/startCase';
import React, { useEffect, useState } from 'react';
import TableCell from '@/components/ui/table/TableCell';

export type CellType = 'text' | 'input' | 'select' | 'checkbox';

export interface CellCondition {
  cellType: CellType;
  column: string;
  rows?: string[];
  options?: string[] | OptionValue[];
  condition?: (value: unknown) => boolean;
  isMultiple?: boolean;
}

interface useTableProps<T extends object> {
  data: T[];
  hideColumns?: string[];
  withCheckbox?: boolean;
  cellConditions?: CellCondition[];
}

function useTable<T extends object & { id: number }>({
  data,
  hideColumns,
  withCheckbox,
  cellConditions,
}: useTableProps<T>) {
  const keysOfData = Object.keys(data[0]).filter(key => !hideColumns?.includes(key));
  const [cpyData, setCpyData] = React.useState<T[]>([]);
  const [checkedRows, setCheckedRows] = React.useState<T[]>([]);

  const tableRef = React.useRef();
  const headers = React.useMemo(
    () => keysOfData.map(key => Object.assign({ label: startCase(key), key, isPlaceholder: true })),
    [data],
  );
  const rows = React.useMemo(() => data, [data]);

  const removeAll = useTableTooltipStore(state => state.removeAll);
  const columns = React.useMemo<ColumnDef<T>[]>(
    () =>
      keysOfData.map(key =>
        Object.assign({
          accessorKey: key,
          header: translate(key),
          footer: key,
          cell: cellProps => {
            const { row, column } = cellProps;
            const cellCondition = getCellCondition(row.id.toString(), column.id);

            return (
              <TableCell
                {...cellProps}
                cellCondition={cellCondition}
                updateCpyData={(rowIndex, columnId, value) => updateCpyData(rowIndex, columnId, value)}
              />
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
              onChange: e => {
                row.getToggleSelectedHandler()(e);
                updateCheckedRow(row.original);
              },
            }}
          />
        </div>
      ),
    });
  }

  const updateCheckedRow = (row: T) => {
    setCheckedRows(prevRows => {
      const targetRow = prevRows.find(prevRow => prevRow.id === row.id);
      if (targetRow) {
        return prevRows.filter(prevRow => prevRow.id !== row.id);
      }
      return prevRows.concat(row);
    });
  };

  const updateCpyData = (rowIndex: number, columnId: string, value: string) => {
    setCpyData(prevCpyData => {
      const updatedCpyData = prevCpyData.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...prevCpyData[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      });
      return updatedCpyData;
    });
  };

  const getCellCondition = (rowId: string, columnId: string): CellCondition | undefined => {
    return cellConditions?.find(condition => {
      const matchColumn = condition.column === columnId;
      const matchRow = !condition.rows || condition.rows.includes(rowId);
      return matchColumn && matchRow;
    });
  };

  useEffect(() => {
    if (!isEmpty(data) && !isEmpty(data[0])) {
      setCpyData([...data]);
    }
    return () => removeAll();
  }, [data]);

  return { tableRef, cpyData, updateCpyData, columns, rows, headers, checkedRows };
}

export default useTable;
