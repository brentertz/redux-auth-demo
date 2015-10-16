import createReducer from '../utils/create-reducer';
import {
  LOAD_AUTH_SUCCESS,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from '../constants';

const initialState = {
  token: null
};

function onLoadAuthSuccess(state, action) {
  return {
    ...state,
    token: action.payload.token
  };
}

function onLogin(state, action) {
  return {
    ...state,
    isLoggingIn: true
  };
}

function onLoginSuccess(state, action) {
  return {
    ...state,
    isLoggingIn: false,
    token: action.payload.token,
    error: null
  };
}

function onLoginFailure(state, action) {
  return {
    ...state,
    isLoggingIn: false,
    token: null,
    error: action.error
  };
}

function onLogout(state, action) {
  return {
    ...state,
    token: null
  };
}

export default createReducer(initialState, {
  [LOAD_AUTH_SUCCESS]: onLoadAuthSuccess,
  [LOGIN]: onLogin,
  [LOGIN_SUCCESS]: onLoginSuccess,
  [LOGIN_FAILURE]: onLoginFailure,
  [LOGOUT]: onLogout
});
