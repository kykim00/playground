import { create } from 'zustand';
import { logger } from './';

interface Modal {
  name: string;
  component: React.FC & { name?: string };
  zIndex: number;
}
interface State {
  modals: Modal[];
  lastZIndex: number;
}
const baseZIndex = 1000;

interface Action {
  open: (component: Modal['component'], name?: string) => void;
  close: (name: Modal['name']) => void;
}

const useModalStore = create<State & Action>()(
  logger(
    set => ({
      modals: [],
      lastZIndex: baseZIndex,
      open: (component, name) =>
        set(state => {
          const componentName = name ?? component.name;
          if (state.modals.every(prev => prev.name !== componentName)) {
            return {
              modals: [
                ...state.modals,
                {
                  name: componentName,
                  component,
                  zIndex: state.lastZIndex + 1,
                },
              ],
              lastZIndex: state.lastZIndex + 1,
            };
          }
          return state;
        }),
      close: name => set(state => ({ modals: state.modals.filter(modal => modal.name !== name) })),
    }),
    'modal-store',
  ),
);

export default useModalStore;
