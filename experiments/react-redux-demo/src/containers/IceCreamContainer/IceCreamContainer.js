import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { buyIceCream } from '../../store';

const IceCreamContainer = (props) => {
  const numberOfIceCreams = useSelector(state => state.iceCream.numberOfIceCreams);
  
  const dispatch = useDispatch();

  return (
    <div>
      <h1>With Hook - useSelector() - from react-redux </h1>
      <h2>Number of cakes - {numberOfIceCreams}</h2>
      <button onClick={() => dispatch(buyIceCream())}>Buy Ice Cream</button>
    </div>
  );
};

export default IceCreamContainer;
