import useModalStore from '@/stores/modal';
import React from 'react';
import Portal from './Portal';

const Modals = () => {
  const [modals, close, moveToTop] = useModalStore(state => [state.modals, state.close, state.moveToTop]);
  return (
    <Portal>
      {modals.map(modal => {
        const { component: ModalComponent, props, zIndex, name } = modal;
        return (
          <div style={{ zIndex }} onClick={() => moveToTop(name)}>
            {React.cloneElement(<ModalComponent key={name} {...props} />, {
              onClose: () => close(name),
            })}
          </div>
        );
      })}
    </Portal>
  );
};

export default Modals;
