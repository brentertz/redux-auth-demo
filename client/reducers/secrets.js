import Immutable from 'immutable';
import createReducer from '../utils/create-reducer';
import {
  LOAD_SECRETS,
  LOAD_SECRETS_SUCCESS,
  LOAD_SECRETS_FAILURE
} from '../constants';

const initialState = Immutable.fromJS({
  secrets: []
});

export default createReducer(initialState, {
  [LOAD_SECRETS]: (state) => state.set('isLoading', true),
  [LOAD_SECRETS_SUCCESS]: (state, { payload: { secrets } }) => {
    return state.merge({
      isLoading: false,
      secrets,
      error: null
    });
  },
  [LOAD_SECRETS_FAILURE]: (state, { error }) => {
    return state.merge({
      isLoading: false,
      secrets: [],
      error
    });
  }
});
