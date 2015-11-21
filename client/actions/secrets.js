import Immutable from 'immutable';
import 'isomorphic-fetch';
import { createAction } from 'redux-actions';
import {
  SECRETS_LOAD_REQUEST,
  SECRETS_LOAD_SUCCESS,
  SECRETS_LOAD_FAILURE
} from '../constants';

export function loadSecrets() {
  return dispatch => {
    dispatch(loadSecretsRequest());

    const token = window.localStorage.getItem('token');

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
