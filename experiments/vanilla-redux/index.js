const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;

console.log('Logged from Index.js!');

// action creators
const buyCake = require('./actions/buyCake');
const buyIceCream = require('./actions/buyIceCream');

// reducers
const cakeReducer = require('./reducers/cakeReducer');
const iceCreamReducer = require('./reducers/iceCreamReducer');

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
});

// store
const store = createStore(rootReducer, applyMiddleware(logger));

// Getting the current value of the rdux store using getState()
console.log('Initially the redux store has value: ' + JSON.stringify(store.getState()));

// Setting subscribers to any change in values in the redux store
// subscribe() method returns back a function which can be used to deregister the listener/subscriber
const unsubscribe = store.subscribe(() => {
  console.log('Updated state: ', store.getState());
});

// invoking actions
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyCake());
store.dispatch(buyIceCream());

unsubscribe();
