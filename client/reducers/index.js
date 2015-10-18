import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import { default as auth } from './auth';

const rootReducer = combineReducers({
  router: routerStateReducer,
  auth
});

export default rootReducer;
