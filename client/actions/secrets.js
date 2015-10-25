import 'isomorphic-fetch';
import {
  LOAD_SECRETS,
  LOAD_SECRETS_SUCCESS,
  LOAD_SECRETS_FAILURE
} from '../constants';

export function loadSecrets() {
  return dispatch => {
    dispatch({ type: LOAD_SECRETS });

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
      dispatch({ type: LOAD_SECRETS_SUCCESS, payload: { secrets } });
    })
    .catch((err) => {
      dispatch({ type: LOAD_SECRETS_FAILURE, error: err.message });
    });
  };
};
