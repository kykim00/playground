'use client';
import Modal from '@/components/common/Modal';
import Popover from '@/components/common/Popover';
import { useState } from 'react';

interface PageParams {
  params: {};
}

const Page = ({ params }: PageParams) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onToggle = () => setIsOpenModal(prev => !prev);
  return (
    <div style={{ width: '1000px', margin: 'auto' }}>
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
      <button onClick={onToggle}>모달 오픈</button>
      <Modal isOpen={isOpenModal} title="모달1" onConfirm={onToggle} onClose={onToggle} />
    </div>
  );
};

export default Page;
