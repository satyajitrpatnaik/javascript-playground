import { createStore, applyMiddleware } from 'redux';
import { middlewares } from '../store/configureStore';
import rootReducer from './../store/rootReducer';

export const storeFactory = (initialState) => {
  const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares));
  return store;
}

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}