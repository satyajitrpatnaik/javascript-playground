import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { buyCake } from '../../store';

const CakeWithHooksContainer = (props) => {
  const numberOfCakes = useSelector(state => state.cake.numberOfCakes);
  
  const dispatch = useDispatch();

  return (
    <div>
      <h1>With Hook - useSelector() - from react-redux </h1>
      <h2>Number of cakes - {numberOfCakes}</h2>
      <button onClick={() => dispatch(buyCake())}>Buy Cake</button>
    </div>
  );
};

export default CakeWithHooksContainer;
