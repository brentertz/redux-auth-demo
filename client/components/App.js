import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { pushState } from 'redux-router';
import * as authActions from '../actions/auth';

@connect(
  state => ({ auth: state.auth, isLoggedIn: !!state.auth.token }),
  { pushState }
)
export default class App extends Component {
  static contextTypes = {
    store: PropTypes.any
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.any,
    isLoggedIn: PropTypes.bool.isRequired,
    pushState: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.onLogout = this.onLogout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.auth.token && nextProps.auth.token) {
      this.props.pushState(null, '/account'); // login
    } else if (this.props.auth.token && !nextProps.auth.token) {
      this.props.pushState(null, '/'); // logout
    }
  }

  onLogout(e) {
    e.preventDefault();
    const { dispatch } = this.context.store;
    dispatch(authActions.logout());
  }

  render() {
    const { isLoggedIn, children } = this.props;

    return (
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/account">Account</Link></li>
            { !isLoggedIn && <li><Link to="/login">Login</Link></li> }
            { isLoggedIn && <li><a href="/logout" onClick={ this.onLogout }>Logout</a></li> }
          </ul>
        </nav>
        <div>{ children }</div>
      </div>
    );
  }
};
