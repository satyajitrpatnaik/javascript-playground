import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { buyCake } from '../../store';

const NewCakeContainer = (props) => {
  const [number, setNumber] = useState(1);
  const numberOfCakes = useSelector(state => state.cake.numberOfCakes);
  
  const dispatch = useDispatch();

  return (
    <div>
      <h1>To be able to buy multiple cakes- using action.payload </h1>
      <h2>Number of cakes - {numberOfCakes}</h2>
      <input type='text' value={number} onChange={e => setNumber(e.target.value)}
        placeholder='enter the number of cakes you want to buy!'/>
      <button onClick={() => dispatch(buyCake(number))}>Buy {number} Cake(s)</button>
    </div>
  );
};

export default NewCakeContainer;
