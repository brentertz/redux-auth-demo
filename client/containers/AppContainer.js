import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { isLoggedIn } from '../reducers/auth';
import { App } from '../components';

@connect(
  (state) => ({ isLoggedIn: isLoggedIn(state) }),
  { logout }
)
export default class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.any,
    isLoggedIn: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
  };

  onLogout = (e) => {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isLoggedIn, children } = this.props;
    const props = { isLoggedIn, children, onLogout: this.onLogout };

    return (
     <App { ...props } />
    );
  }
};
