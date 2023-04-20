import Select from '@/components/ui/select/select-v2';
import IndeterminateCheckbox from '@/components/ui/table/TableCheckbox';
import { translate } from '@/utils/translate';
import { zodResolver } from '@hookform/resolvers/zod';
import { ColumnDef } from '@tanstack/react-table';
import isEmpty from 'lodash/isEmpty';
import startCase from 'lodash/startCase';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type CellType = 'text' | 'input' | 'select' | 'checkbox';

interface CellCondition {
  cellType: CellType;
  column: string;
  rows?: string[];
  options?: string[];
  condition?: (value: unknown) => boolean;
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
  const columns = React.useMemo<ColumnDef<T>[]>(
    () =>
      keysOfData.map(key =>
        Object.assign({
          accessorKey: key,
          header: translate(key),
          cell: ({ getValue, row, column, table, renderValue }) => {
            const initialValue = getValue();
            const schema = z.object({
              [column.id]: z.string().min(1, { message: `${column.id}를 입력해주세요.` }),
            });
            const { register, handleSubmit } = useForm({
              defaultValues: {
                [`${column.id}.${row.id}`]: initialValue as string,
              },
              resolver: zodResolver(schema),
            });
            const [selectedOptionValue, setSelectedOptionValue] = useState('');
            const onBlur = () => {
              handleSubmit(
                data => console.log('data', data),
                error => console.log('errpr', error),
              )();
              // updateCpyData(row.index, column.id, value as string);
            };

            const handleChangeOption = (value: any) => {
              setSelectedOptionValue(value);
              updateCpyData(row.index, column.id, value.name);
            };

            const cellCondition = getCellCondition(row.id.toString(), column.id);

            if (cellCondition) {
              console.log('true');
            }
            if (cellCondition && cellCondition.cellType === 'select') {
              console.log('select');

              return (
                <Select
                  label="계정과목선택"
                  placeholder="선택"
                  value={selectedOptionValue}
                  onChange={handleChangeOption}
                  options={cellCondition.options!}
                />
              );
            } else if (cellCondition && cellCondition.cellType === 'input' && cellCondition.condition?.(initialValue)) {
              return <input {...register(`${column.id}.${row.id}`)} onBlur={onBlur} />;
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

  const getCellCondition = (rowId: string, columnId: string): CellCondition<T> | undefined => {
    return cellConditions?.find(condition => {
      console.log(condition);

      const matchColumn = condition.column === columnId;
      const matchRow = !condition.rows || condition.rows.includes(rowId);
      return matchColumn && matchRow;
    });
  };

  useEffect(() => {
    if (!isEmpty(data) && !isEmpty(data[0])) {
      setCpyData(data);
    }
  }, [data]);
  return { tableRef, cpyData, updateCpyData, columns, rows, headers };
}

export default useTable;
