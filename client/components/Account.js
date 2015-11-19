import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default class Account extends Component {
  static propTypes = {
    secrets: ImmutablePropTypes.list
  };

  render() {
    const { secrets } = this.props;
    const secretItems = secrets && secrets.map((secret) => {
      return <li key={ secret.get('_id') }>{ secret.get('value') }</li>;
    });

    return (
      <div className="Account">
        <h1>Account</h1>
        <p>Welcome to your account.</p>

        { secrets &&
          <section>
            <h2>Secrets</h2>
            <ul>
              { secretItems }
            </ul>
          </section>
        }
      </div>
    );
  }
};
