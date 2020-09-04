const redux = require('redux');
const createStore = redux.createStore;

console.log('Logged from Index.js!');

// action type
const BUY_CAKE = 'BUY_CAKE';

// action creator
function buyCake() {
  return {
    type: BUY_CAKE,
    boughtAmount: 1,
    info: 'Buying Cake'
  }
}

// reducer
const initialState = {
  numberOfCakes: 10
};

const reducer = (state = initialState, action) => {
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

const store = createStore(reducer);

// Getting the current value of the rdux store using getState()
console.log('Initially the redux store has value: ' + JSON.stringify(store.getState()));

// Setting subscribers to any change in values in the redux store
// subscribe() method returns back a function which can be used to deregister the listener/subscriber
const unsubscribe = store.subscribe(() => {
  console.log('Updated state: ', store.getState());
});

// invoking actions
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

unsubscribe();
