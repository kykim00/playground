import React, { useState } from 'react';
import Select, { OptionValue } from '@/components/ui/select/select-v2';
import Tooltip from '@/components/ui/tooltip';
import { useForm } from 'react-hook-form';
import { translate } from '@/utils/translate';
import useTableTooltipStore from '@/stores/tableTooltip';
import { josa } from '@toss/hangul';
import { CellCondition } from '@/hooks/useTable';
import { Cell } from '@tanstack/react-table';

interface TableCellProps<T> extends Pick<Cell<T, unknown>, 'getValue' | 'row' | 'column' | 'renderValue'> {
  cellCondition?: CellCondition;
  updateCpyData: (rowIndex: number, columnId: string, value: string) => void;
}

function TableCellV2<T>({ cellCondition, getValue, row, column, updateCpyData }: TableCellProps<T>) {
  const initialValue = getValue() as string;

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
    return <div>{initialValue}</div>;
  }
}

export default TableCellV2;
