import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Account from './Account';
import * as secretsActions from '../actions/secrets';
import { getSecrets } from '../reducers/secrets';

@connect((state) => ({ secrets: getSecrets(state) }))
export default class AccountContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    secrets: ImmutablePropTypes.list.isRequired
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(secretsActions.loadSecrets());
  }

  render() {
    const { secrets } = this.props;
    return <Account secrets={ secrets } />;
  }
};

