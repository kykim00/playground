import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { logger } from '.';

interface State {
  tableTooltips: string[];
}

interface Action {
  add: (value: string) => void;
  remove: (value: string) => void;
  removeAll: () => void;
}

const useTableTooltipStore = create<State & Action>()(
  persist(
    logger(set => ({
      tableTooltips: [],
      add: value =>
        set(state => {
          if (state.tableTooltips.includes(value)) {
            return state;
          }
          return { tableTooltips: [...state.tableTooltips, value] };
        }),
      remove: value =>
        set(state => ({
          tableTooltips: state.tableTooltips.filter(item => item !== value),
        })),
      removeAll: () =>
        set(() => ({
          tableTooltips: [],
        })),
    })),
    {
      name: 'tableTppltips-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useTableTooltips = () => useTableTooltipStore(state => state.tableTooltips) || [];

export default useTableTooltipStore;
