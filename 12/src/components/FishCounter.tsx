import useBearStore from '@/stores/bear';

const FishCounter = () => {
  const [fishes, addFishes, eatFishes] = useBearStore(state => [state.fishes, state.addFishes, state.eatFishes]);

  return (
    <>
      <h2>{fishes} FISHES</h2>
      <button onClick={addFishes}>add fishes</button>
      <button onClick={() => eatFishes(3)}>eat 3 Fishes</button>
    </>
  );
};

export default FishCounter;
