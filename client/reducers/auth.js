import Immutable from 'immutable';
import { handleActions } from 'redux-actions';
import {
  AUTH_LOAD_SUCCESS,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_SUCCESS
} from '../constants';

const initialState = Immutable.fromJS({
  token: null
});

export default handleActions({
  [AUTH_LOAD_SUCCESS]: (state, { payload: { token } }) => state.merge({ token }),
  [AUTH_LOGIN_REQUEST]: (state) => state.set('isLoggingIn', true),
  [AUTH_LOGIN_SUCCESS]: (state, { payload: { token } }) => {
    return state.merge({
      isLoggingIn: false,
      token,
      error: null
    });
  },
  [AUTH_LOGIN_FAILURE]: (state, { payload: error }) => {
    return state.merge({
      isLoggingIn: false,
      token: null,
      error: error.message
    });
  },
  [AUTH_LOGOUT_SUCCESS]: (state) => state.set('token', null)
}, initialState);
