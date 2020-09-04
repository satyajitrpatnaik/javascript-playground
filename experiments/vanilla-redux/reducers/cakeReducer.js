const BUY_CAKE = require('../actions').BUY_CAKE;

const initialCakeState = {
  numberOfCakes: 10
};

module.exports = (state = initialCakeState, action) => {
  switch(action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1
      };
    default:
      return state;
  }
};
