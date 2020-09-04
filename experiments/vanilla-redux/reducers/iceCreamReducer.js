const BUY_ICE_CREAM = require('./../actions').BUY_ICE_CREAM;

const initialIceCreamState = {
  numberOfIceCreams: 63
};

module.exports = (state = initialIceCreamState, action) => {
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
