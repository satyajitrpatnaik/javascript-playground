import { BUY_ICE_CREAM } from './iceCreamActionTypes';

const initialState = {
  numberOfIceCreams: 10
};

const iceCreamReducer = (state = initialState, action) => {
  switch(action.type) {
    case BUY_ICE_CREAM:
      return {
        ...state,
        numberOfIceCreams: state.numberOfIceCreams - 1
      };
    default: 
      return state;
  }
};

export default iceCreamReducer;
