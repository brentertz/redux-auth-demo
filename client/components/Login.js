import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import * as authActions from '../actions/auth';

@connect(({ auth }) => ({ auth }))
export default class Login extends Component {
  static contextTypes = {
    store: PropTypes.any
  };

  static propTypes = {
    auth: ImmutablePropTypes.map.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.context.store;
    const data = {
      email: this.refs.email.value,
      password: this.refs.password.value
    };
    dispatch(authActions.login(data));
  }

  render() {
    const { auth } = this.props;
    const error = auth.get('error');

    return (
      <div className="Login">
        <h1>Login</h1>
        <form onSubmit={ this.handleSubmit }>
          { error && `💥 ${ error }` }
          <fieldset>
            <div>
              <label>
                Email
                <input type="email" defaultValue="foo@bar.com" ref="email" />
              </label>
            </div>
            <div>
              <label>
                Password
                <input type="password" defaultValue="password" ref="password" />
              </label>
            </div>
            <button type="submit">Login</button>
          </fieldset>
        </form>
      </div>
    );
  }
};
