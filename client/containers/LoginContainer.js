import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { getAuthError } from '../reducers/auth';
import { Login } from '../components';

@connect(
  (state) => ({ error: getAuthError(state) }),
  { login }
)
export default class LoginContainer extends Component {
  static propTypes = {
    error: PropTypes.string,
    login: PropTypes.func.isRequired
  };

  render() {
    return <Login { ...this.props } />;
  }
};
