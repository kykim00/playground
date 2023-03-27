import axios from 'axios';
import { create, StateCreator, StoreMutatorIdentifier } from 'zustand';
import { persist } from 'zustand/middleware';

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
type Logger = <
  T extends State,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string,
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T extends State>(f: StateCreator<T, [], []>, name?: string) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  const loggedSet: typeof set = (...a) => {
    set(...a);
    console.log(...(name ? [`${name}:`] : []), get());
  };
  store.setState = loggedSet;

  return f(loggedSet, get, store);
};

type DummyLogger = <
  T extends State,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string,
) => StateCreator<T, Mps, Mcs>;

const dummyLogger: DummyLogger = (f, name) => f;

export const logger = process.env.NODE_ENV === 'development' ? (loggerImpl as unknown as Logger) : dummyLogger;

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
