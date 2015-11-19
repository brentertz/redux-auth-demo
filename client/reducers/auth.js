import Immutable from 'immutable';
import createReducer from '../utils/create-reducer';
import {
  LOAD_AUTH_SUCCESS,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from '../constants';

const initialState = Immutable.fromJS({
  token: null
});

export default createReducer(initialState, {
  [LOAD_AUTH_SUCCESS]: (state, { payload: { token } }) => state.merge({ token }),
  [LOGIN]: (state) => state.set('isLoggingIn', true),
  [LOGIN_SUCCESS]: (state, { payload: { token } }) => {
    return state.merge({
      isLoggingIn: false,
      token,
      error: null
    });
  },
  [LOGIN_FAILURE]: (state, { error }) => {
    return state.merge({
      isLoggingIn: false,
      token: null,
      error
    });
  },
  [LOGOUT]: (state) => state.set('token', null)
});
