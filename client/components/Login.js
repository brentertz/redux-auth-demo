import React, { Component, PropTypes } from 'react';

export default class Login extends Component {
  static propTypes = {
    error: PropTypes.string,
    onSubmit: PropTypes.func.isRequired
  };

  render() {
    const { error, onSubmit } = this.props;

    return (
      <div className="Login">
        <h1>Login</h1>
        <form onSubmit={ onSubmit.bind(this, this) }>
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
