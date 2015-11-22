import 'isomorphic-fetch';
import { createAction } from 'redux-actions';
import { pushState } from 'redux-router';
import {
  AUTH_LOAD_SUCCESS,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_SUCCESS
} from '../constants';

export function loadAuth() {
  return (dispatch) => {
    const token = window.localStorage.getItem('token');
    dispatch(loadAuthSuccess({ token }));
  };
};

export function login(data) {
  return (dispatch) => {
    dispatch(loginRequest(data));

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
      dispatch(loginSuccess({ token }));
      dispatch(pushState(null, '/account'));
    })
    .catch((err) => {
      dispatch(loginFailure(err));
    });
  };
};

export function logout() {
  return (dispatch) => {
    window.localStorage.removeItem('token');
    dispatch(logoutSuccess());
    dispatch(pushState(null, '/'));
  };
};

const loadAuthSuccess = createAction(AUTH_LOAD_SUCCESS, ({ token }) => ({ token }));
const loginRequest = createAction(AUTH_LOGIN_REQUEST, (data) => data);
const loginSuccess = createAction(AUTH_LOGIN_SUCCESS, ({ token }) => ({ token }));
const loginFailure = createAction(AUTH_LOGIN_FAILURE, (err) => err);
const logoutSuccess = createAction(AUTH_LOGOUT_SUCCESS);

