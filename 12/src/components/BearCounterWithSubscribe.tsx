import useBearStore from '@/stores/bear';
import { useEffect, useRef } from 'react';

const BearCounterWithSubscribe = () => {
  const bearRef = useRef(useBearStore.getState().bears);
  // Connect to the store on mount, disconnect on unmount, catch state-changes in a reference
  useEffect(() => useBearStore.subscribe(state => (bearRef.current = state.bears)), []);

  console.log('log at once');

  return <h1>{bearRef?.current} Bears</h1>;
};

export default BearCounterWithSubscribe;
