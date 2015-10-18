import 'isomorphic-fetch';
import {
  LOAD_AUTH_SUCCESS,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from '../constants';

export function load() {
  return dispatch => {
    const token = window.localStorage.getItem('token');
    dispatch({ type: LOAD_AUTH_SUCCESS, payload: { token } });
  };
};

export function login(data) {
  return dispatch => {
    dispatch({ type: LOGIN, payload: data });

    fetch('/api/sessions', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.text();
    })
    .then((token) => {
      window.localStorage.setItem('token', token);
      dispatch({ type: LOGIN_SUCCESS, payload: { token } });
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAILURE, error: err.message });
    });
  };
};

export function logout() {
  window.localStorage.removeItem('token');
  return { type: LOGOUT };
};
