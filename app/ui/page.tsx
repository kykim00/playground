'use client';
import Popover from '@/components/common/Popover';
import ModalContextProvider, { ModalDispatch, ModalDispatchContext } from '@/provider/ModalContext';
import dynamic from 'next/dynamic';
import { useContext, useState } from 'react';

interface PageParams {
  params: {};
}
const Modal1 = dynamic(() => import('@/components/common/modal/Modal1'), {
  ssr: false,
  loading: () => <div>로딩중</div>,
});
const Modal2 = dynamic(() => import('@/components/common/modal/Modal2'), {
  ssr: false,
  loading: () => <div>로딩중</div>,
});
const ButtonSection = () => {
  const { pushModal, deleteModal } = useContext<ModalDispatch>(ModalDispatchContext);

  return (
    <>
      <button
        onClick={() =>
          pushModal({
            id: '1',
            type: 'simple',
            ModalComponent: Modal1,
          })
        }
      >
        모달1 오픈
      </button>
      <button
        onClick={() =>
          pushModal({
            id: '2',
            type: 'simple',
            ModalComponent: Modal2,
          })
        }
      >
        모달2 오픈
      </button>
    </>
  );
};
const Page = ({ params }: PageParams) => {
  return (
    <ModalContextProvider>
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
        <ButtonSection />
      </div>
    </ModalContextProvider>
  );
};

export default Page;
