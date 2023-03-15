import { FC, Fragment } from 'react';
import { createContext, ReactNode, useContext, useState } from 'react';

interface ModalProps {
  title?: string;
  onConfirm?: () => void;
  onClose?: () => void;
}
interface Modal {
  id: string;
  ModalComponent: React.ComponentType<ModalProps>;
  type: string;
}
export interface ModalDispatch {
  pushModal: (modal: Modal) => void;
  deleteModal: (id: string) => void;
}
export const ModalContext = createContext<Modal[]>([]);

export const ModalDispatchContext = createContext<ModalDispatch>({
  pushModal: () => {},
  deleteModal: () => {},
});

export const Modals = () => {
  const modals = useContext(ModalContext);

  const { deleteModal } = useContext(ModalDispatchContext);
  return (
    <>
      {modals.map(({ id, ModalComponent, type }) => (
        <Fragment key={id}>
          <ModalComponent
            onClose={() => {
              deleteModal(id);
            }}
          />
        </Fragment>
      ))}
    </>
  );
};
const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<Modal[]>([]);

  const pushModal = (modal: Modal) => {
    if (modals.every(prev => prev.id !== modal.id)) {
      setModals(prev => [...prev, modal]);
    }
  };

  const deleteModal = (id: string) => {
    setModals(modals.filter(modal => modal.id !== id));
  };
  const dispatch = {
    pushModal,
    deleteModal,
  };
  return (
    <ModalContext.Provider value={modals}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
        <Modals />
      </ModalDispatchContext.Provider>
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
