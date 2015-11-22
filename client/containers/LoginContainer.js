import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { getAuthError } from '../reducers/auth';
import { Login } from '../components';

@connect((state) => ({ error: getAuthError(state) }))
export default class LoginContainer extends Component {
  static contextTypes = {
    store: PropTypes.any
  };

  static propTypes = {
    error: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(child, e) {
    e.preventDefault();
    const { dispatch } = this.context.store;
    const data = {
      email: child.refs.email.value,
      password: child.refs.password.value
    };
    dispatch(login(data));
  }

  render() {
    const { error } = this.props;
    const props = { error, onSubmit: this.onSubmit };

    return (
      <Login { ...props } />
    );
  }
};
