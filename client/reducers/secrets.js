import Immutable from 'immutable';
import { handleActions } from 'redux-actions';
import {
  SECRETS_LOAD_REQUEST,
  SECRETS_LOAD_SUCCESS,
  SECRETS_LOAD_FAILURE
} from '../constants';

const initialState = Immutable.fromJS({
  secrets: []
});

export default handleActions({
  [SECRETS_LOAD_REQUEST]: (state) => state.set('isLoading', true),
  [SECRETS_LOAD_SUCCESS]: (state, { payload: { secrets } }) => {
    return state.merge({
      isLoading: false,
      secrets,
      error: null
    });
  },
  [SECRETS_LOAD_FAILURE]: (state, { payload: error }) => {
    return state.merge({
      isLoading: false,
      secrets: [],
      error: error.message
    });
  }
}, initialState);
