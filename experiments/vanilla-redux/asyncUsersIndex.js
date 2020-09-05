const redux = require('redux');
const reduxLogger = require('redux-logger');
const thunkMiddleware = require('redux-thunk').default;
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const fetchUsers = require('./actions/usersActionCreators').fetchUsers;
const { asyncUsersReducer } = require('./reducers/asyncUsersReducer');

const store = createStore(asyncUsersReducer, applyMiddleware(thunkMiddleware, logger));

const unsubscribeToUsersStore = store.subscribe(() => console.log(store.getState()));

// invoke actions
store.dispatch(fetchUsers());

// unsubscribe from the users store
unsubscribeToUsersStore();
