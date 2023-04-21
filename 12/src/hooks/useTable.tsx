import Select, { OptionValue } from '@/components/ui/select/select-v2';
import IndeterminateCheckbox from '@/components/ui/table/TableCheckbox';
import useTableTooltipStore, { useTableTooltips } from '@/stores/tableTooltip';
import { translate } from '@/utils/translate';
import { ColumnDef } from '@tanstack/react-table';
import isEmpty from 'lodash/isEmpty';
import startCase from 'lodash/startCase';
import React, { useEffect, useState } from 'react';
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

function useTable<T extends object>({ data, hideColumns, withCheckbox, cellConditions }: useTableProps<T>) {
  const keysOfData = Object.keys(data[0]).filter(key => !hideColumns?.includes(key));
  const [cpyData, setCpyData] = React.useState<T[]>([]);
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
              const [selectedOptionValue, setSelectedOptionValue] = useState('');
              const handleChangeOption = (value: string) => {
                setSelectedOptionValue(value);
                updateCpyData(row.index, column.id, value);
              };

              const handleMultipleChangeOption = (value: OptionValue[]) => {
                const labelText = value.map(v => v.name).join(', ');
                setSelectedOptionValue(labelText);
                updateCpyData(row.index, column.id, labelText);
              };

              return (
                <Select
                  label="계정과목선택"
                  placeholder="선택"
                  value={selectedOptionValue}
                  onChange={handleChangeOption}
                  onMultipleChange={handleMultipleChangeOption}
                  options={cellCondition.options!}
                  // isMultiple={!!cellCondition.isMultiple}
                />
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
                    if (value && showTooltip) {
                      remove(targetName);
                    }
                  },
                  error => console.log('errpr', error),
                )();
              };

              return (
                <>
                  <input {...register(`${column.id}-${row.id}`)} onBlur={onBlur} />
                  {showTooltip && <div>{translate(column.id)}를 입력하세요</div>}
                </>
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
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    });
  }

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

  return { tableRef, cpyData, updateCpyData, columns, rows, headers };
}

export default useTable;
