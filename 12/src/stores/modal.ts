import { create } from 'zustand';
import { logger } from './';

interface ModalProps {
  onConfirm?: () => void;
  onClose?: () => void;
}

interface Modal {
  name: string;
  component: React.FC & { name?: string };
  props?: ModalProps;
  zIndex: number;
}

interface State {
  modals: Modal[];
  lastZIndex: number;
}
const baseZIndex = 1000;

interface Action {
  open: (component: Modal['component'], props?: ModalProps) => void;
  close: (name: Modal['name']) => void;
  moveToTop: (name: Modal['name']) => void;
  closeAll: () => void;
}

const useModalStore = create<State & Action>()(
  logger(
    set => ({
      modals: [],
      lastZIndex: baseZIndex,
      open: (component, props) =>
        set(state => {
          if (state.modals.every(prev => prev.name !== component.name)) {
            return {
              modals: [
                ...state.modals,
                {
                  name: component.name,
                  component,
                  props,
                  zIndex: state.lastZIndex + 1,
                },
              ],
              lastZIndex: state.lastZIndex + 1,
            };
          }
          return state;
        }),
      close: name => set(state => ({ modals: state.modals.filter(modal => modal.name !== name) })),
      moveToTop: name =>
        set(state => {
          const targetModal = state.modals.find(modal => modal.name === name);
          if (!targetModal) return state;
          return {
            modals: [
              ...state.modals.filter(modal => modal.name !== targetModal.name),
              { ...targetModal, zIndex: state.lastZIndex + 1 },
            ],
            lastZIndex: state.lastZIndex + 1,
          };
        }),
      closeAll: () => set({ modals: [], lastZIndex: baseZIndex }),
    }),
    'modal-store',
  ),
);

export default useModalStore;
