import { BUY_CAKE } from './cakeActionTypes';

const initialState = {
  numberOfCakes: 10
};

const CakeReducer = (state = initialState, action) => {
  switch(action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - action.payload
      };
    default:
      return state;
  }
};

export default CakeReducer;
