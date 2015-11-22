import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Account } from '../components';
import { loadSecrets } from '../actions/secrets';
import { getSecrets } from '../reducers/secrets';

@connect(
  (state) => ({ secrets: getSecrets(state) }),
  (dispatch) => bindActionCreators({ loadSecrets }, dispatch)
)
export default class AccountContainer extends Component {
  static propTypes = {
    loadSecrets: PropTypes.func.isRequired,
    secrets: ImmutablePropTypes.list.isRequired
  };

  componentDidMount() {
    this.props.loadSecrets();
  }

  render() {
    const { secrets } = this.props;
    return <Account secrets={ secrets } />;
  }
};

