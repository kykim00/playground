import axios from 'axios';
import { create, StateCreator, StoreMutatorIdentifier } from 'zustand';
import { persist } from 'zustand/middleware';
import { logger } from '.';

interface State {
  bears: number;
  fishes: number;
}
interface Action {
  increaseOne: () => void;
  increaseNums: (count: State['bears']) => void;
  removeAllBears: () => void;
  eatFishes: (count: State['fishes']) => void;
  addFishes: () => Promise<void>;
}

const useBearStore = create<State & Action>()(
  persist(
    logger(
      set => ({
        bears: 0,
        fishes: 0,
        increaseOne: () => set(state => ({ bears: state.bears + 1 })),
        increaseNums: count => set(state => ({ bears: state.bears + count })),
        removeAllBears: () => set({ bears: 0 }),
        eatFishes: count => set(state => ({ fishes: state.fishes - count })),
        addFishes: async () => {
          const res = await axios.get('https://dummyjson.com/products');
          set(state => ({ fishes: state.fishes + res.data.products.length }));
        },
      }),
      'bear-store',
    ),
    {
      name: 'bear-store',
    },
  ),
);

export default useBearStore;
