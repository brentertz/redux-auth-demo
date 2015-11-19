import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import { default as auth } from './auth';
import { default as secrets } from './secrets';

const rootReducer = combineReducers({
  router,
  auth,
  secrets
});

export default rootReducer;
