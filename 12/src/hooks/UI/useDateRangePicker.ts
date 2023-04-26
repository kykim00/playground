import { useState } from 'react';

const useDateRangePicker = () => {
  const now = new Date();
  const [startDate, setStartDate] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  const [endDate, setEndDate] = useState(new Date(now.getFullYear(), now.getMonth() + 1, 0));

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  };
};

export default useDateRangePicker;
