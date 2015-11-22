import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { getAuthError } from '../reducers/auth';
import { Login } from '../components';

@connect(
  (state) => ({ error: getAuthError(state) }),
  (dispatch) => bindActionCreators({ login }, dispatch)
)
export default class LoginContainer extends Component {
  static propTypes = {
    error: PropTypes.string,
    login: PropTypes.func.isRequired
  };

  onSubmit = (child, e) => {
    e.preventDefault();
    const data = {
      email: child.refs.email.value,
      password: child.refs.password.value
    };
    this.props.login(data);
  }

  render() {
    const { error } = this.props;
    const props = { error, onSubmit: this.onSubmit };

    return (
      <Login { ...props } />
    );
  }
};
