import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import { default as auth } from './auth';
import { default as secrets } from './secrets';

const rootReducer = combineReducers({
  router: routerStateReducer,
  auth,
  secrets
});

export default rootReducer;
