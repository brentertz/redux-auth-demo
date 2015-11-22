import Immutable from 'immutable';
import 'isomorphic-fetch';
import { createAction } from 'redux-actions';
import { getAuthToken } from '../reducers/auth';
import {
  SECRETS_LOAD_REQUEST,
  SECRETS_LOAD_SUCCESS,
  SECRETS_LOAD_FAILURE
} from '../constants';

export function loadSecrets() {
  return (dispatch, getState) => {
    dispatch(loadSecretsRequest());

    const token = getAuthToken(getState());

    fetch('/api/secrets', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `JWT ${ token }`
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(({ secrets }) => {
      dispatch(loadSecretsSuccess({ secrets: Immutable.fromJS(secrets) }));
    })
    .catch((err) => {
      dispatch(loadSecretsFailure(err));
    });
  };
};

const loadSecretsRequest = createAction(SECRETS_LOAD_REQUEST);
const loadSecretsSuccess = createAction(SECRETS_LOAD_SUCCESS, ({ secrets }) => ({ secrets }));
const loadSecretsFailure = createAction(SECRETS_LOAD_FAILURE, (err) => err);
