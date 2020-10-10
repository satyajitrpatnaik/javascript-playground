import React, { useReducer } from 'react';

const initialState = 0;
const reducer = (state, action) => {
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

function CounterThree() {

  const [count, dispatch] = useReducer(reducer, initialState);
  const [countTwo, dispatch2] = useReducer(reducer, initialState);

  return (
    <div style={{ color: 'white' }}>
      <div>Count: {count}</div>
      
      <button onClick={() => dispatch('INCREMENT')}>Increment</button>
      <button onClick={() => dispatch('DECREMENT')}>Decrement</button>
      <button onClick={() => dispatch('RESET')}>Reset</button>

      <div>
        <div>Count Two: {countTwo}</div>

        <button onClick={() => dispatch2('INCREMENT')}>Increment</button>
        <button onClick={() => dispatch2('DECREMENT')}>Decrement</button>
        <button onClick={() => dispatch2('RESET')}>Reset</button>

      </div>
    </div>
  )
}

export default CounterThree;
