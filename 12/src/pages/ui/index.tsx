import { people, Select } from '@/components/ui/select';
import SelectV2 from '@/components/ui/select/select-v2';
import { useState } from 'react';

const UIPage = () => {
  const [selectedValue, setSelectedValue] = useState();
  const [selectedValues, setSelectedValues] = useState();
  const handleChangeOption = (value: any) => {
    setSelectedValue(value);
  };

  const handleChangeMultipleOption = (value: any) => {
    setSelectedValues(value);
  };

  return (
    <>
      <Select />
      <SelectV2
        placeholder="선택하세요"
        label="po"
        onChange={handleChangeOption}
        isMultiple
        onMultipleChange={handleChangeMultipleOption}
        value={selectedValues}
        options={people}
      />
    </>
  );
};

export default UIPage;
