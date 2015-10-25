import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Account from './Account';
import * as secretsActions from '../actions/secrets';

@connect(state => ({ secrets: state.secrets }))
export default class AccountContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    secrets: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(secretsActions.loadSecrets());
  }

  render() {
    const { secrets } = this.props.secrets;
    return <Account secrets={ secrets } />;
  }
};

