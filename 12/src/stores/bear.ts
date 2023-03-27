import { create, StateCreator, StoreMutatorIdentifier } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  bears: number;
}
interface Action {
  increaseOne: () => void;
  increaseNums: (count: State['bears']) => void;
  removeAllBears: () => void;
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
  type T = ReturnType<typeof f>;
  const loggedSet: typeof set = (...a) => {
    set(...a);
    console.log(...(name ? [`${name}:`] : []), get());
  };
  store.setState = loggedSet;

  return f(loggedSet, get, store);
};

export const logger = loggerImpl as unknown as Logger;

const useBearStore = create<State & Action>()(
  persist(
    logger(
      set => ({
        bears: 0,
        increaseOne: () => set(state => ({ bears: state.bears + 1 })),
        increaseNums: count => set(state => ({ bears: state.bears + count })),
        removeAllBears: () => set({ bears: 0 }),
      }),
      'bear-store',
    ),
    {
      name: 'bear-store',
    },
  ),
);

export default useBearStore;
