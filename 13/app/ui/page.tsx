'use client';
import Popover from '@/components/common/Popover';
import ModalContextProvider from '@/provider/ModalContext';

interface PageParams {
  params: {};
}

const Page = ({ params }: PageParams) => {
  return (
    <ModalContextProvider>
      <div style={{ width: '1000px', minHeight: '100vh', margin: 'auto' }}>
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
    </ModalContextProvider>
  );
};

export default Page;
