import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import { default as auth, stateKey as authStateKey } from './auth';
import { default as secrets, stateKey as secretsStateKey } from './secrets';

const rootReducer = combineReducers({
  router,
  [authStateKey]: auth,
  [secretsStateKey]: secrets
});

export default rootReducer;
