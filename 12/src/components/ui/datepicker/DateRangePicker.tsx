import styled from '@emotion/styled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';

interface DateRangePickerProps {
  startDate: Date;
  setStartDate: any;
  endDate: Date;
  setEndDate: any;
}
const DateRangePicker = ({ startDate, setStartDate, endDate, setEndDate }: DateRangePickerProps) => {
  return (
    <Container>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        // selectsStart
        locale={ko}
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        // selectsStart
        startDate={startDate}
        endDate={endDate}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 20px;
`;
export default DateRangePicker;
