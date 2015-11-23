import React, { Component, PropTypes } from 'react';

export default class Login extends Component {
  static propTypes = {
    error: PropTypes.string,
    login: PropTypes.func.isRequired
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.refs;
    const data = {
      email: email.value,
      password: password.value
    };
    this.props.login(data);
  }

  render() {
    const { error } = this.props;

    return (
      <div className="Login">
        <h1>Login</h1>
        <form onSubmit={ this.onSubmit }>
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
