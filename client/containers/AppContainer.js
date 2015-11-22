import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { logout } from '../actions/auth';
import { getAuthState, isLoggedIn } from '../reducers/auth';
import { App } from '../components';

@connect(
  (state) => ({
    auth: getAuthState(state),
    isLoggedIn: isLoggedIn(state)
  }),
  { logout, pushState }
)
export default class AppContainer extends Component {
  static propTypes = {
    auth: ImmutablePropTypes.map.isRequired,
    children: PropTypes.any,
    isLoggedIn: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.auth.get('token') && nextProps.auth.get('token')) {
      this.props.pushState(null, '/account'); // login
    } else if (this.props.auth.get('token') && !nextProps.auth.get('token')) {
      this.props.pushState(null, '/'); // logout
    }
  }

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
