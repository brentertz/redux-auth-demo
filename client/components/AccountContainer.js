import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Account from './Account';
import * as secretsActions from '../actions/secrets';

@connect(({ secrets }) => ({ secrets }))
export default class AccountContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    secrets: ImmutablePropTypes.map.isRequired
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(secretsActions.loadSecrets());
  }

  render() {
    const secrets = this.props.secrets.get('secrets');
    return <Account secrets={ secrets } />;
  }
};

