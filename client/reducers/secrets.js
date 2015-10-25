import createReducer from '../utils/create-reducer';
import {
  LOAD_SECRETS,
  LOAD_SECRETS_SUCCESS,
  LOAD_SECRETS_FAILURE
} from '../constants';

const initialState = {
  token: null
};

function onLoadSecrets(state, action) {
  return {
    ...state,
    isLoading: true
  };
}

function onLoadSecretsSuccess(state, action) {
  return {
    ...state,
    isLoading: false,
    secrets: action.payload.secrets,
    error: null
  };
}

function onLoadSecretsFailure(state, action) {
  return {
    ...state,
    isLoading: false,
    secrets: null,
    error: action.error
  };
}

export default createReducer(initialState, {
  [LOAD_SECRETS]: onLoadSecrets,
  [LOAD_SECRETS_SUCCESS]: onLoadSecretsSuccess,
  [LOAD_SECRETS_FAILURE]: onLoadSecretsFailure
});
