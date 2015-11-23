import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.any,
    isLoggedIn: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { isLoggedIn, children, logout } = this.props;

    return (
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/account">Account</Link></li>
            { !isLoggedIn && <li><Link to="/login">Login</Link></li> }
            { isLoggedIn && <li><a href="/logout" onClick={ logout }>Logout</a></li> }
          </ul>
        </nav>
        <div>{ children }</div>
      </div>
    );
  }
};
