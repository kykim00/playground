import { useDateSelect } from 'react-ymd-date-select';

const Dropdown = ({ date, setDate }: any) => {
  const dateSelect = useDateSelect(date, setDate);

  return (
    <div>
      <select
        value={dateSelect.yearValue}
        onChange={(e: any) => {
          dateSelect.onYearChange(e);
          console.log(e);
        }}
      >
        <option value="" disabled></option>
        {dateSelect.yearOptions.map(yearOption => (
          <option key={yearOption.value} value={yearOption.value}>
            {yearOption.label}
          </option>
        ))}
      </select>
      <select value={dateSelect.monthValue} onChange={dateSelect.onMonthChange}>
        <option value="" disabled></option>
        {dateSelect.monthOptions.map(monthOption => (
          <option key={monthOption.value} value={monthOption.value}>
            {monthOption.label}
          </option>
        ))}
      </select>
      <select
        value={dateSelect.dayValue}
        onChange={e => {
          dateSelect.onDayChange(e);
          console.log(e.target.value);
        }}
      >
        <option value="" disabled></option>
        {dateSelect.dayOptions.map(dayOption => (
          <option key={dayOption.value} value={dayOption.value}>
            {dayOption.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
