import React, { Component, PropTypes } from 'react';

export default class Account extends Component {
  static propTypes = {
    secrets: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        value: PropTypes.string
      })
    )
  };

  render() {
    const { secrets } = this.props;
    const secretItems = secrets && secrets.map(({ _id, value }) => {
      return <li key={ _id }>{ value }</li>;
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
