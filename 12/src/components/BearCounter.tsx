import useBearStore from '@/stores/bear';

const BearCounter = () => {
  const [bears, increase] = useBearStore(state => [state.bears, state.increaseOne]);

  return (
    <h1>
      {bears} Bears <button onClick={increase}>INCREASE</button>
    </h1>
  );
};

export default BearCounter;
