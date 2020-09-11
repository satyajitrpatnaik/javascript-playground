import React, { useReducer } from 'react';

const initialState = 0;
const reducer = (state = initialState, action) => {
  switch (action) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

function CounterComponent() {

  const [count, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div style={{ color: 'white' }}>
      <div>Count: {count}</div>
      <button onClick={() => dispatch('INCREMENT')}>Increment</button>
      <button onClick={() => dispatch('DECREMENT')}>Decrement</button>
      <button onClick={() => dispatch('RESET')}>Reset</button>
    </div>
  )
}

export default CounterComponent
