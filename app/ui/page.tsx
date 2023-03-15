'use client';
import Popover from '@/components/common/Popover';

interface PageParams {
  params: {};
}

const Page = ({ params }: PageParams) => {
  return (
    <div>
      <Popover
        content={
          <p>
            Popover component
            <br />
          </p>
        }
      >
        <button>(?)</button>
      </Popover>
    </div>
  );
};

export default Page;
