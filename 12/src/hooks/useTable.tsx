import Select, { OptionValue } from '@/components/ui/select/select-v2';
import IndeterminateCheckbox from '@/components/ui/table/TableCheckbox';
import Tooltip from '@/components/ui/tooltip';
import useTableTooltipStore, { useTableTooltips } from '@/stores/tableTooltip';
import { translate } from '@/utils/translate';
import { ColumnDef } from '@tanstack/react-table';
import isEmpty from 'lodash/isEmpty';
import startCase from 'lodash/startCase';
import React, { useEffect, useState } from 'react';
import { josa } from '@toss/hangul';
import { useForm } from 'react-hook-form';

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
  const headers = React.useMemo(() => keysOfData.map(key => Object.assign({ label: startCase(key), key })), [data]);
  const rows = React.useMemo(() => data, [data]);

  const removeAll = useTableTooltipStore(state => state.removeAll);
  const columns = React.useMemo<ColumnDef<T>[]>(
    () =>
      keysOfData.map(key =>
        Object.assign({
          accessorKey: key,
          header: translate(key),
          cell: ({ getValue, row, column, renderValue }) => {
            const initialValue = getValue();
            const cellCondition = getCellCondition(row.id.toString(), column.id);

            if (cellCondition && cellCondition.cellType === 'select') {
              const targetName = `${column.id}-${row.id}`;
              const selectDefaultValue = !!cellCondition.isMultiple ? ([] as OptionValue[]) : '';
              const [selectedOptionValue, setSelectedOptionValue] = useState(selectDefaultValue);
              const [tableTooltips, remove] = useTableTooltipStore(state => [state.tableTooltips, state.remove]);
              const showTooltip = tableTooltips.includes(targetName);

              const handleChangeOption = (value: string) => {
                setSelectedOptionValue(value);
                updateCpyData(row.index, column.id, value);
                if (showTooltip) {
                  remove(targetName);
                }
              };

              const handleMultipleChangeOption = (value: OptionValue[]) => {
                const labelText = value.map(v => v.name).join(', ');
                setSelectedOptionValue(value);
                updateCpyData(row.index, column.id, labelText);
              };

              return (
                <div style={{ position: 'relative' }}>
                  <Select
                    label="계정과목선택"
                    placeholder="선택"
                    value={selectedOptionValue}
                    onChange={handleChangeOption}
                    onMultipleChange={handleMultipleChangeOption}
                    options={cellCondition.options!}
                    isMultiple={!!cellCondition.isMultiple}
                  />
                  {showTooltip && <Tooltip>{josa(translate(column.id), '을/를')} 선택하세요</Tooltip>}
                </div>
              );
            } else if (cellCondition && cellCondition.cellType === 'input' && cellCondition.condition?.(initialValue)) {
              const targetName = `${column.id}-${row.id}`;
              const [tableTooltips, remove] = useTableTooltipStore(state => [state.tableTooltips, state.remove]);
              const showTooltip = tableTooltips.includes(targetName);
              const { register, handleSubmit } = useForm({
                defaultValues: {
                  [targetName]: '' as string,
                },
              });
              const onBlur = () => {
                handleSubmit(
                  data => {
                    const value = Object.values(data)[0];
                    updateCpyData(row.index, column.id, value);
                    console.log('onblur');

                    if (value && showTooltip) {
                      remove(targetName);
                    }
                  },
                  error => console.log('errpr', error),
                )();
              };

              return (
                <div style={{ position: 'relative' }}>
                  <input {...register(`${column.id}-${row.id}`)} onBlur={onBlur} />
                  {showTooltip && <Tooltip>{josa(translate(column.id), '을/를')} 입력하세요</Tooltip>}
                </div>
              );
            } else {
              return renderValue();
            }
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
