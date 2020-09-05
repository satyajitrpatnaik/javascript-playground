const { 
  FETCH_USERS_SUCCESS,
  FETCH_USERS_REQUEST,
  FETCH_USERS_FAILURE
} = require('../actions/');

const initialState = {
  loading: false,
  users: [],
  error: ''
};

const asyncUsersReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users,
        error: ''
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload.error
      };
    default:
      return state;
  };
};

module.exports = {
  asyncUsersReducer: asyncUsersReducer
};
