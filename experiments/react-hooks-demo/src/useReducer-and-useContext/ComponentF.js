import React, { useContext } from 'react';
import { CounterContext } from './../App';

function ComponentF() {

  const counter = useContext(CounterContext);
  return (
    <div>
      <div>ComponentF - Count: {counter.countState.count}</div>
      <button onClick={() => counter.dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={() => counter.dispatch({ type: 'DECREMENT' })}>Decrement</button>
      <button onClick={() => counter.dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  )
}

export default ComponentF;
