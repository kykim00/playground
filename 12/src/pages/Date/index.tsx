import Dropdown from '@/components/Dropdown';
import { useState } from 'react';

interface PageParams {
  params: {};
}

const formatDate = (targetDate: Date) => {
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const date = targetDate.getDate();

  return `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;
};
const Page = ({ params }: PageParams) => {
  const [date, setDate] = useState(formatDate(new Date()));

  return (
    <>
      <h1>New Page</h1>
      <Dropdown date={date} setDate={setDate} />
    </>
  );
};

export default Page;
