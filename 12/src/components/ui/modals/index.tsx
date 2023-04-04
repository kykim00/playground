import useModalStore from '@/stores/modal';
import React from 'react';

const Modals = () => {
  const [modals, close] = useModalStore(state => [state.modals, state.close]);
  return (
    <div>
      {modals.map(modal => {
        const props = modal.component.props;
        return React.cloneElement(<modal.component key={modal.zIndex} {...props} />, {
          onClose: () => close(modal.name),
        });
      })}
    </div>
  );
};

export default Modals;
