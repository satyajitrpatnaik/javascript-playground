import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const middlewares = [thunk]; // for adding extra functionalities to the dispatch() function

let enhancers; // for adding extra functionalities to the redux store

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
  enhancers = composeWithDevTools(applyMiddleware(...middlewares));
} else {
  enhancers = applyMiddleware(...middlewares);
}

const configureStore = () => {
  const store = createStore(rootReducer, enhancers);
  return store;
}

export default configureStore();
